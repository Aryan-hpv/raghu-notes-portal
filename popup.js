/* Raghu Notes Portal — contribution/help popup. No libraries required. */
(() => {
  'use strict';
  const SHOW_AFTER_MS = 2500;
  const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;
  const STORAGE_KEY = 'rnp-help-popup-dismissed';
  const communityUrl = window.PORTAL_DATA?.community;
  const contributeUrl = window.PORTAL_DATA?.contribute;
  if (!communityUrl || !contributeUrl) return;

  const style = document.createElement('style');
  style.textContent = `
    .rnp-help-trigger{position:fixed;right:20px;bottom:20px;z-index:89;border:1px solid #ffffff2b;border-radius:999px;background:#25d366;color:#062e1b;padding:13px 18px;font:700 14px 'DM Sans',sans-serif;box-shadow:0 12px 32px #0005;cursor:pointer}
    .rnp-help-trigger:hover{filter:brightness(1.07)}
    .rnp-help-overlay[hidden]{display:none!important}
    .rnp-help-overlay{position:fixed;inset:0;z-index:120;background:#000a;display:grid;place-items:center;padding:18px}
    .rnp-help-dialog{width:min(100%,440px);position:relative;background:var(--panel,#121e32);color:var(--text,#eef4ff);border:1px solid var(--border,#2a3a52);border-radius:22px;padding:30px;box-shadow:0 20px 70px #0008;font-family:'DM Sans',sans-serif}
    .rnp-help-dialog h2{font:700 26px Outfit,sans-serif;margin:10px 25px 12px 0}
    .rnp-help-dialog p{font-size:14px;color:var(--muted,#a4b5cc);line-height:1.65}
    .rnp-help-close{position:absolute;right:16px;top:13px;background:transparent;border:0;color:var(--text,#eef4ff);font-size:27px;cursor:pointer;padding:4px 10px}
    .rnp-help-eyebrow{font-size:12px;letter-spacing:.12em;color:var(--accent,#b8fa72);font-weight:800}
    .rnp-help-actions{display:flex;flex-wrap:wrap;gap:10px;margin:23px 0 16px}
    .rnp-help-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:12px 16px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:800}
    .rnp-help-whatsapp{background:#25d366;color:#062e1b!important}
    .rnp-help-contribute{border:1px solid var(--border,#2a3a52);color:var(--text,#eef4ff)!important}
    .rnp-help-note{font-size:11px!important;margin:0}
    @media(max-width:480px){.rnp-help-dialog{padding:25px 21px}.rnp-help-trigger{right:14px;bottom:14px}}
    @media(prefers-reduced-motion:reduce){.rnp-help-trigger{transition:none}}
  `;
  document.head.append(style);

  const trigger = document.createElement('button');
  trigger.className = 'rnp-help-trigger';
  trigger.type = 'button';
  trigger.textContent = '💬 Need help?';
  trigger.setAttribute('aria-haspopup', 'dialog');

  const overlay = document.createElement('div');
  overlay.className = 'rnp-help-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <section class="rnp-help-dialog" role="dialog" aria-modal="true" aria-labelledby="rnp-help-title" aria-describedby="rnp-help-desc">
      <button class="rnp-help-close" type="button" aria-label="Close popup">×</button>
      <span class="rnp-help-eyebrow">RAGHU NOTES PORTAL</span>
      <h2 id="rnp-help-title">Need notes or want to contribute? 📚</h2>
      <p id="rnp-help-desc">Have notes, lab manuals, previous papers, or other useful academic files? Want to contribute, request materials, or report a broken Drive link? We'd love to hear from you.</p>
      <div class="rnp-help-actions">
        <a class="rnp-help-whatsapp" target="_blank" rel="noopener noreferrer">Join WhatsApp community ↗</a>
        <a class="rnp-help-contribute" target="_blank" rel="noopener noreferrer">Contribute files ↗</a>
      </div>
      <p class="rnp-help-note">The WhatsApp link opens our community, not a direct developer chat. Developed &amp; maintained by Manikanta Ganduri.</p>
    </section>
  `;
  overlay.querySelector('.rnp-help-whatsapp').href = communityUrl;
  overlay.querySelector('.rnp-help-contribute').href = contributeUrl;
  document.body.append(trigger, overlay);

  const closeButton = overlay.querySelector('.rnp-help-close');
  let previousFocus = null;
  const dismiss = () => {
    overlay.hidden = true;
    document.body.style.removeProperty('overflow');
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (_) {}
    (previousFocus || trigger).focus();
  };
  const open = () => {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };
  trigger.addEventListener('click', open);
  closeButton.addEventListener('click', dismiss);
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });
  overlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') dismiss();
    if (e.key === 'Tab') {
      const targets = [...overlay.querySelectorAll('button, a[href]')];
      const first = targets[0], last = targets[targets.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  let show = true;
  try { show = Date.now() - Number(localStorage.getItem(STORAGE_KEY) || 0) >= DISMISS_FOR_MS; } catch (_) {}
  if (show) window.setTimeout(() => { if (document.visibilityState === 'visible' && overlay.hidden) open(); }, SHOW_AFTER_MS);
})();
