(function () {
  var STORAGE_KEY = "harness-bookmark-hub-v1";

  var boardsEl = document.getElementById("boards");
  var filterInput = document.getElementById("filter");
  var btnReset = document.getElementById("btn-reset");
  var dialog = document.getElementById("link-dialog");
  var linkForm = document.getElementById("link-form");
  var dialogTitle = document.getElementById("dialog-title");
  var formSectionId = document.getElementById("form-section-id");
  var formLinkId = document.getElementById("form-link-id");
  var formLabel = document.getElementById("form-label");
  var formHref = document.getElementById("form-href");
  var formDescription = document.getElementById("form-description");
  var formCancel = document.getElementById("form-cancel");
  var toastRegion = document.getElementById("toast-region");
  var toastHideTimer = null;

  var state = {
    sections: [],
  };

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function newLinkId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "id-" + String(Date.now()) + "-" + String(Math.random()).slice(2);
  }

  function ensureLinkIds(sections) {
    sections.forEach(function (section) {
      section.links.forEach(function (link) {
        if (!link.id) {
          link.id = newLinkId();
        }
      });
    });
  }

  function showToast(message) {
    if (!toastRegion || !message) return;
    toastRegion.innerHTML = "";

    var toast = document.createElement("div");
    toast.className = "toast toast-error";
    toast.setAttribute("role", "status");

    var text = document.createElement("p");
    text.className = "toast-message";
    text.textContent = message;

    var dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "toast-dismiss";
    dismiss.setAttribute("aria-label", "Dismiss notification");
    dismiss.textContent = "×";

    function removeToast() {
      toast.classList.add("toast-out");
      window.setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 220);
    }

    dismiss.addEventListener("click", function () {
      window.clearTimeout(toastHideTimer);
      removeToast();
    });

    toast.appendChild(text);
    toast.appendChild(dismiss);
    toastRegion.appendChild(toast);

    window.clearTimeout(toastHideTimer);
    toastHideTimer = window.setTimeout(removeToast, 6000);
  }

  function normalizeUrl(raw) {
    var s = (raw || "").trim();
    if (!s) return s;
    if (/^https?:\/\//i.test(s)) return s;
    return "https://" + s;
  }

  function loadDefaults() {
    var raw = window.HARNESS_BOOKMARKS || [];
    var sections = deepClone(raw);
    ensureLinkIds(sections);
    return sections;
  }

  /**
   * Adds any new default boards (by id) so existing localStorage picks up new cards
   * without a full reset. Section order follows bookmarks.js defaults.
   */
  function mergeNewSectionsFromDefaults(storedSections, defaultSections) {
    var present = {};
    storedSections.forEach(function (s) {
      present[s.id] = true;
    });
    var merged = storedSections.slice();
    var didAdd = false;
    defaultSections.forEach(function (def) {
      if (!present[def.id]) {
        var copy = deepClone(def);
        ensureLinkIds([copy]);
        merged.push(copy);
        didAdd = true;
      }
    });
    var orderMap = {};
    defaultSections.forEach(function (d, i) {
      orderMap[d.id] = i;
    });
    merged.sort(function (a, b) {
      var ia = orderMap[a.id];
      var ib = orderMap[b.id];
      if (ia !== undefined && ib !== undefined) return ia - ib;
      if (ia !== undefined) return -1;
      if (ib !== undefined) return 1;
      return 0;
    });
    return { merged: merged, didAdd: didAdd };
  }

  function loadFromStorage() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.sections)) return null;
      ensureLinkIds(parsed.sections);
      return parsed.sections;
    } catch (e) {
      return null;
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ sections: state.sections })
      );
    } catch (e) {
      showToast("Could not save — storage may be full or disabled.");
    }
  }

  function initState() {
    var defaults = loadDefaults();
    var stored = loadFromStorage();
    if (!stored) {
      state.sections = defaults;
      saveToStorage();
      return;
    }
    var mergeResult = mergeNewSectionsFromDefaults(stored, defaults);
    state.sections = mergeResult.merged;
    if (mergeResult.didAdd) {
      saveToStorage();
    }
  }

  function findSection(sectionId) {
    return state.sections.find(function (s) {
      return s.id === sectionId;
    });
  }

  function findLink(sectionId, linkId) {
    var section = findSection(sectionId);
    if (!section) return null;
    var idx = section.links.findIndex(function (l) {
      return l.id === linkId;
    });
    if (idx === -1) return null;
    return { section: section, index: idx, link: section.links[idx] };
  }

  function normalize(s) {
    return (s || "").toLowerCase();
  }

  function openDialogAdd(sectionId) {
    dialogTitle.textContent = "Add link";
    formSectionId.value = sectionId;
    formLinkId.value = "";
    formLabel.value = "";
    formHref.value = "";
    formDescription.value = "";
    dialog.showModal();
    setTimeout(function () {
      formLabel.focus();
    }, 0);
  }

  function openDialogEdit(sectionId, linkId) {
    var found = findLink(sectionId, linkId);
    if (!found) return;
    dialogTitle.textContent = "Edit link";
    formSectionId.value = sectionId;
    formLinkId.value = linkId;
    formLabel.value = found.link.label || "";
    formHref.value = found.link.href || "";
    formDescription.value = found.link.description || "";
    dialog.showModal();
    setTimeout(function () {
      formLabel.focus();
    }, 0);
  }

  function deleteLink(sectionId, linkId) {
    var found = findLink(sectionId, linkId);
    if (!found) return;
    var ok = confirm(
      'Remove "' + (found.link.label || "this link") + '" from the list?'
    );
    if (!ok) return;
    found.section.links.splice(found.index, 1);
    saveToStorage();
    render();
  }

  function moveLink(sectionId, linkId, delta) {
    var found = findLink(sectionId, linkId);
    if (!found) return;
    var links = found.section.links;
    var i = found.index;
    var j = i + delta;
    if (j < 0 || j >= links.length) return;
    var tmp = links[i];
    links[i] = links[j];
    links[j] = tmp;
    saveToStorage();
    render();
  }

  function handleFormSubmit(ev) {
    ev.preventDefault();
    var sectionId = formSectionId.value;
    var linkId = formLinkId.value;
    var label = formLabel.value.trim();
    var href = normalizeUrl(formHref.value);
    var description = formDescription.value.trim();

    if (!label || !href) return;

    var section = findSection(sectionId);
    if (!section) {
      dialog.close();
      return;
    }

    if (linkId) {
      var found = findLink(sectionId, linkId);
      if (found) {
        found.link.label = label;
        found.link.href = href;
        found.link.description = description;
      }
    } else {
      section.links.push({
        id: newLinkId(),
        label: label,
        href: href,
        description: description,
      });
    }

    saveToStorage();
    dialog.close();
    render();
  }

  function resetToDefaults() {
    var ok = confirm(
      "Discard all saved changes and reload the default list from bookmarks.js?"
    );
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    state.sections = loadDefaults();
    saveToStorage();
    render();
  }

  function render() {
    boardsEl.innerHTML = "";
    var q = normalize(filterInput.value.trim());

    state.sections.forEach(function (section) {
      var board = document.createElement("section");
      board.className = "board";
      board.dataset.section = section.id;

      var head = document.createElement("div");
      head.className = "board-head";

      var titles = document.createElement("div");
      titles.className = "board-titles";

      var title = document.createElement("h2");
      title.className = "board-title";
      title.dataset.accent = section.accent;
      title.textContent = section.title;

      var meta = document.createElement("p");
      meta.className = "board-meta";
      meta.textContent = section.subtitle || "";

      titles.appendChild(title);
      titles.appendChild(meta);

      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn btn-sm btn-accent board-add";
      addBtn.dataset.accent = section.accent;
      addBtn.textContent = "Add link";
      addBtn.addEventListener("click", function () {
        openDialogAdd(section.id);
      });

      head.appendChild(titles);
      head.appendChild(addBtn);

      var list = document.createElement("ul");
      list.className = "link-list";

      var visible = 0;
      section.links.forEach(function (link, linkIndex) {
        var haystack =
          normalize(link.label) +
          " " +
          normalize(link.description) +
          " " +
          normalize(link.href);
        var match = !q || haystack.includes(q);

        var li = document.createElement("li");
        li.className = "link-item" + (match ? "" : " hidden");
        li.dataset.linkId = link.id;

        var row = document.createElement("div");
        row.className = "link-row";

        var a = document.createElement("a");
        a.className = "link-main";
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        var dot = document.createElement("span");
        dot.className = "link-dot";
        dot.dataset.accent = section.accent;
        dot.setAttribute("aria-hidden", "true");

        var body = document.createElement("div");
        body.className = "link-body";

        var labelEl = document.createElement("div");
        labelEl.className = "link-label";
        labelEl.textContent = link.label;

        body.appendChild(labelEl);
        if (link.description) {
          var desc = document.createElement("p");
          desc.className = "link-desc";
          desc.textContent = link.description;
          body.appendChild(desc);
        }

        a.appendChild(dot);
        a.appendChild(body);

        var actions = document.createElement("div");
        actions.className = "link-actions";

        var btnUp = document.createElement("button");
        btnUp.type = "button";
        btnUp.className = "btn-icon";
        btnUp.title = "Move up";
        btnUp.setAttribute("aria-label", "Move up");
        btnUp.textContent = "↑";
        btnUp.disabled = linkIndex === 0;
        btnUp.addEventListener("click", function (e) {
          e.preventDefault();
          moveLink(section.id, link.id, -1);
        });

        var btnDown = document.createElement("button");
        btnDown.type = "button";
        btnDown.className = "btn-icon";
        btnDown.title = "Move down";
        btnDown.setAttribute("aria-label", "Move down");
        btnDown.textContent = "↓";
        btnDown.disabled = linkIndex === section.links.length - 1;
        btnDown.addEventListener("click", function (e) {
          e.preventDefault();
          moveLink(section.id, link.id, 1);
        });

        var btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.className = "btn-icon";
        btnEdit.title = "Edit";
        btnEdit.setAttribute("aria-label", "Edit link");
        btnEdit.textContent = "✎";
        btnEdit.addEventListener("click", function (e) {
          e.preventDefault();
          openDialogEdit(section.id, link.id);
        });

        var btnDel = document.createElement("button");
        btnDel.type = "button";
        btnDel.className = "btn-icon btn-icon-danger";
        btnDel.title = "Remove";
        btnDel.setAttribute("aria-label", "Remove link");
        btnDel.textContent = "×";
        btnDel.addEventListener("click", function (e) {
          e.preventDefault();
          deleteLink(section.id, link.id);
        });

        actions.appendChild(btnUp);
        actions.appendChild(btnDown);
        actions.appendChild(btnEdit);
        actions.appendChild(btnDel);

        row.appendChild(a);
        row.appendChild(actions);
        li.appendChild(row);
        list.appendChild(li);

        if (match) visible++;
      });

      board.appendChild(head);
      board.appendChild(list);
      boardsEl.appendChild(board);

      if (visible === 0 && q) {
        board.style.opacity = "0.45";
      } else {
        board.style.opacity = "";
      }
    });

    if (q) {
      var anyVisible = boardsEl.querySelector(".link-item:not(.hidden)");
      if (!anyVisible) {
        var hint = document.createElement("p");
        hint.className = "empty-hint";
        hint.textContent = "No links match your filter. Try another keyword.";
        boardsEl.appendChild(hint);
      }
    }
  }

  linkForm.addEventListener("submit", handleFormSubmit);

  formCancel.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("cancel", function (ev) {
    ev.preventDefault();
    dialog.close();
  });

  btnReset.addEventListener("click", resetToDefaults);

  filterInput.addEventListener("input", render);

  initState();
  render();
})();
