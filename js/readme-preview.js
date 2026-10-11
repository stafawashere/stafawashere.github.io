(function () {
  const HOVER_DELAY_MS = 1500;
  const LONG_PRESS_MS = 500;
  const LONG_PRESS_SLOP_PX = 10;
  const VIEWPORT_MARGIN = 8;
  const CARD_GAP = 12;
  const STYLESHEETS = ['css/vendor/github-markdown-dark.css', 'css/readme-preview.css'];

  const readmeCache = new Map();
  let stylesReady = null;
  let popover = null;
  let titleEl = null;
  let repoLink = null;
  let bodyEl = null;
  let openCard = null;
  let renderToken = 0;
  let suppressNextClick = false;

  const sheetQuery = window.matchMedia('(max-width: 640px)');

  function injectStylesheets() {
    if (stylesReady) return stylesReady;

    const loads = STYLESHEETS.map(href => new Promise(resolve => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', resolve, { once: true });
      document.head.appendChild(link);
    }));

    stylesReady = Promise.all(loads);
    return stylesReady;
  }

  function ensurePopover() {
    if (popover) return popover;

    popover = document.createElement('div');
    popover.id = 'readme-popover';
    popover.className = 'readme-popover';
    popover.setAttribute('role', 'dialog');
    popover.tabIndex = -1;
    popover.hidden = true;

    const head = document.createElement('div');
    head.className = 'readme-popover-head';

    titleEl = document.createElement('span');
    titleEl.className = 'readme-popover-title';

    repoLink = document.createElement('a');
    repoLink.className = 'readme-popover-link';
    repoLink.target = '_blank';
    repoLink.rel = 'noopener';
    repoLink.textContent = 'View on GitHub';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'readme-popover-close';
    closeButton.setAttribute('aria-label', 'Close README preview');
    closeButton.textContent = '\u00d7';
    closeButton.addEventListener('click', () => closePopover(true));

    head.append(titleEl, repoLink, closeButton);

    bodyEl = document.createElement('div');
    bodyEl.className = 'readme-popover-body';
    bodyEl.addEventListener('click', onBodyClick);

    popover.append(head, bodyEl);
    document.body.appendChild(popover);

    return popover;
  }

  function fetchReadme(repo) {
    if (readmeCache.has(repo)) return Promise.resolve(readmeCache.get(repo));

    return fetch('readmes/' + encodeURIComponent(repo) + '.html').then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.text();
    }).then(html => {
      readmeCache.set(repo, html);
      return html;
    });
  }

  function toArticle(html) {
    const template = document.createElement('template');
    template.innerHTML = html;

    let article = template.content.querySelector('article.markdown-body');
    if (!article) {
      article = document.createElement('article');
      article.className = 'markdown-body';
      article.append(template.content);
    }

    article.querySelectorAll('a[href]').forEach(link => {
      const isInPageAnchor = link.getAttribute('href').startsWith('#');
      if (isInPageAnchor) return;

      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    return article;
  }

  function showStatus(text, repoUrl) {
    const status = document.createElement('p');
    status.className = 'readme-popover-status';
    status.append(text);

    if (repoUrl) {
      const link = document.createElement('a');
      link.href = repoUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Open the repo on GitHub';
      status.append(' ', link, '.');
    }

    bodyEl.replaceChildren(status);
  }

  function onBodyClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    event.preventDefault();

    const targetId = decodeURIComponent(link.getAttribute('href').slice(1));
    const target = bodyEl.querySelector('[id="' + CSS.escape(targetId) + '"]');
    if (!target) return;

    const offset = target.getBoundingClientRect().top - bodyEl.getBoundingClientRect().top;
    bodyEl.scrollTop += offset;
  }

  function positionPopover(card) {
    const isSheet = sheetQuery.matches;
    popover.classList.toggle('is-sheet', isSheet);

    if (isSheet) {
      popover.style.left = '';
      popover.style.top = '';
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const width = popover.offsetWidth;
    const height = popover.offsetHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;

    const rightSideLeft = cardRect.right + CARD_GAP;
    const leftSideLeft = cardRect.left - CARD_GAP - width;
    const fitsRight = rightSideLeft + width <= viewportWidth - VIEWPORT_MARGIN;
    const fitsLeft = leftSideLeft >= VIEWPORT_MARGIN;

    const roomLeft = cardRect.left;
    const roomRight = viewportWidth - cardRect.right;
    const fitsNeither = !fitsRight && !fitsLeft;
    const preferLeft = (!fitsRight && fitsLeft) || (fitsNeither && roomLeft > roomRight);

    let left = preferLeft ? leftSideLeft : rightSideLeft;

    const maxLeft = viewportWidth - VIEWPORT_MARGIN - width;
    left = Math.max(VIEWPORT_MARGIN, Math.min(left, maxLeft));

    const nav = document.getElementById('nav');
    const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
    const minTop = navBottom + VIEWPORT_MARGIN;
    const maxTop = viewportHeight - VIEWPORT_MARGIN - height;

    let top = cardRect.top;
    top = Math.max(minTop, Math.min(top, maxTop));

    popover.style.left = (left - bodyRect.left) + 'px';
    popover.style.top = (top - bodyRect.top) + 'px';
  }

  function renderReadme(repo, repoUrl, card) {
    const token = ++renderToken;
    showStatus('Loading README...');

    fetchReadme(repo).then(html => {
      if (token !== renderToken) return;

      bodyEl.replaceChildren(toArticle(html));
      bodyEl.scrollTop = 0;
      positionPopover(card);
    }).catch(() => {
      if (token !== renderToken) return;

      showStatus('This README could not be loaded.', repoUrl);
      positionPopover(card);
    });
  }

  function openPopover(card) {
    const repo = card.dataset.readme;
    const repoUrl = card.href;
    const isAlreadyOpen = openCard === card && popover && !popover.hidden;
    if (isAlreadyOpen) return;

    injectStylesheets().then(() => {
      ensurePopover();

      openCard = card;

      popover.setAttribute('aria-label', repo + ' README');
      titleEl.textContent = repo;
      repoLink.href = repoUrl;

      popover.hidden = false;
      renderReadme(repo, repoUrl, card);
      positionPopover(card);

      void popover.offsetWidth;
      popover.classList.add('is-visible');
      popover.focus({ preventScroll: true });

      document.addEventListener('keydown', onKeydown, true);
      document.addEventListener('pointerdown', onOutsidePointerdown, true);
    });
  }

  function closePopover(restoreFocus) {
    const isOpen = popover && !popover.hidden;
    if (!isOpen) return;

    const card = openCard;
    renderToken++;

    popover.classList.remove('is-visible');
    popover.hidden = true;
    bodyEl.replaceChildren();
    openCard = null;

    document.removeEventListener('keydown', onKeydown, true);
    document.removeEventListener('pointerdown', onOutsidePointerdown, true);

    if (restoreFocus && card) card.focus({ preventScroll: true });
  }

  function onKeydown(event) {
    if (event.key !== 'Escape') return;

    event.stopPropagation();
    closePopover(true);
  }

  function onOutsidePointerdown(event) {
    if (popover.contains(event.target)) return;

    const isOnOpenCard = openCard && openCard.contains(event.target);
    const isSheet = popover.classList.contains('is-sheet');
    if (isSheet) suppressNextClick = true;

    closePopover(!isOnOpenCard);
  }

  function onDocumentPointerdown() {
    suppressNextClick = false;
  }

  function onDocumentClick(event) {
    if (!suppressNextClick) return;

    suppressNextClick = false;
    event.preventDefault();
    event.stopPropagation();
  }

  function bindLongPress(grid) {
    const touchOnly = window.matchMedia('(hover: none)');
    let pressTimer = null;
    let pressCard = null;
    let pressPointerId = null;
    let startX = 0;
    let startY = 0;

    function cancelPress() {
      clearTimeout(pressTimer);
      pressTimer = null;
      pressCard = null;
      pressPointerId = null;
    }

    grid.addEventListener('pointerdown', event => {
      const card = event.target.closest('.project-card[data-readme]');
      const isMouse = event.pointerType === 'mouse';
      const canLongPress = card && !isMouse && touchOnly.matches;
      if (!canLongPress) return;

      cancelPress();
      pressCard = card;
      pressPointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;

      pressTimer = setTimeout(() => {
        const longPressedCard = pressCard;
        cancelPress();
        suppressNextClick = true;
        openPopover(longPressedCard);
      }, LONG_PRESS_MS);
    });

    grid.addEventListener('pointermove', event => {
      const isPressPointer = pressTimer && event.pointerId === pressPointerId;
      if (!isPressPointer) return;

      const travel = Math.hypot(event.clientX - startX, event.clientY - startY);
      if (travel > LONG_PRESS_SLOP_PX) cancelPress();
    });

    ['pointerup', 'pointercancel'].forEach(type => {
      grid.addEventListener(type, event => {
        if (event.pointerId === pressPointerId) cancelPress();
      });
    });

    grid.addEventListener('contextmenu', event => {
      const card = event.target.closest('.project-card[data-readme]');
      const isTouchLongPress = card && touchOnly.matches;
      if (isTouchLongPress) event.preventDefault();
    });
  }

  function initReadmePreview(grid) {
    if (!grid) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let hoverTimer = null;
    let hoverCard = null;

    function cancelHover() {
      clearTimeout(hoverTimer);
      hoverTimer = null;
      hoverCard = null;
    }

    grid.addEventListener('pointerover', event => {
      const card = event.target.closest('.project-card[data-readme]');
      const isMouse = event.pointerType === 'mouse';
      const canHover = isMouse && finePointer.matches;
      if (!card || !canHover || card === hoverCard) return;

      cancelHover();
      hoverCard = card;
      hoverTimer = setTimeout(() => {
        hoverTimer = null;
        openPopover(card);
      }, HOVER_DELAY_MS);
    });

    grid.addEventListener('pointerout', event => {
      if (!hoverCard) return;

      const stillInsideCard = event.relatedTarget && hoverCard.contains(event.relatedTarget);
      if (stillInsideCard) return;

      cancelHover();
    });

    document.addEventListener('pointerdown', onDocumentPointerdown, true);
    document.addEventListener('click', onDocumentClick, true);
    bindLongPress(grid);

    window.addEventListener('resize', () => {
      const isOpen = popover && !popover.hidden && openCard;
      if (isOpen) positionPopover(openCard);
    }, { passive: true });
  }

  window.initReadmePreview = initReadmePreview;
})();
