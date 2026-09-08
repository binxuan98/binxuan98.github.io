import { societyModules } from '../data/society';

const app = document.querySelector<HTMLElement>('[data-twin-app]');
if (app) {
  let active = 0;
  let tourTimer: ReturnType<typeof setInterval> | undefined;
  let tourActive = false;
  const tourButton = app.querySelector<HTMLButtonElement>('[data-tour]')!;
  const announce = (message: string) => {
    const region = app.querySelector<HTMLElement>('[data-announcement]')!;
    region.textContent = message;
    window.setTimeout(() => { if (region.textContent === message) region.textContent = ''; }, 4500);
  };
  const setTour = (enabled: boolean) => {
    tourActive = enabled;
    window.clearInterval(tourTimer);
    tourButton.setAttribute('aria-pressed', String(enabled));
    tourButton.querySelector('span')!.textContent = enabled ? '暂停巡游' : '自动巡游';
    app.dispatchEvent(new CustomEvent('twin-tour', { detail: enabled }));
    if (enabled) {
      select(active, true);
      tourTimer = window.setInterval(() => { if (!document.hidden) select((active + 1) % societyModules.length, true); }, 6500);
    }
  };
  function select(index: number, focus: boolean) {
    active = index;
    app!.querySelectorAll<HTMLElement>('[data-module]').forEach(node => {
      const selected = Number(node.dataset.module) === index;
      node.classList.toggle('is-active', selected);
      node.setAttribute('aria-pressed', String(selected));
    });
    app!.querySelectorAll<HTMLElement>('[data-detail]').forEach(node => { node.hidden = Number(node.dataset.detail) !== index; });
    app!.querySelector('[data-scene-title]')!.textContent = focus ? societyModules[index].shortTitle : '园区全景';
    app!.dispatchEvent(new CustomEvent('twin-select', { detail: { index, focus } }));
  }
  app.querySelectorAll<HTMLButtonElement>('[data-module]').forEach(button => button.addEventListener('click', () => {
    setTour(false);
    select(Number(button.dataset.module), true);
    // Keep the selected content visible when the dock is used below the mobile scene.
    if (window.innerWidth <= 600 && button.closest('.twin-dock')) {
      const map = app.querySelector('.twin-map')!;
      if (map.getBoundingClientRect().bottom < 0) app.querySelector('.twin-detail')!.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }
  }));
  app.addEventListener('twin-pick', (event) => { setTour(false); select((event as CustomEvent).detail, true); });
  app.addEventListener('twin-interact', () => { if (tourActive) setTour(false); });
  tourButton.addEventListener('click', () => setTour(!tourActive));
  app.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(button => button.addEventListener('click', () => {
    setTour(false);
    app.querySelectorAll('[data-view]').forEach(node => node.setAttribute('aria-pressed', String(node === button)));
    app.dispatchEvent(new CustomEvent('twin-view', { detail: button.dataset.view }));
  }));
  app.querySelector('[data-reset]')!.addEventListener('click', () => {
    setTour(false);
    select(0, false);
    app.querySelectorAll<HTMLElement>('[data-view]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.view === 'perspective')));
    app.dispatchEvent(new CustomEvent('twin-reset'));
  });
  app.querySelectorAll<HTMLInputElement>('[data-layer]').forEach(input => input.addEventListener('change', () => {
    if (input.dataset.layer === 'labels') app.querySelector<HTMLElement>('[data-landmarks]')!.hidden = !input.checked;
    app.dispatchEvent(new CustomEvent('twin-layer', { detail: { layer: input.dataset.layer, visible: input.checked } }));
  }));
  const fullScreenButton = app.querySelector<HTMLButtonElement>('[data-fullscreen]')!;
  if (!document.fullscreenEnabled) fullScreenButton.hidden = true;
  fullScreenButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { announce('当前浏览器暂不支持全屏，可使用浏览器的全屏功能。'); }
  });
  document.addEventListener('fullscreenchange', () => {
    const label = document.fullscreenElement ? '退出全屏' : '进入全屏';
    fullScreenButton.setAttribute('aria-label', label);
    fullScreenButton.title = label;
  });
  const fallback = (message?: string) => {
    setTour(false);
    app.querySelector<HTMLElement>('[data-scene-loading]')!.hidden = true;
    app.querySelector<HTMLElement>('[data-scene-fallback]')!.hidden = false;
    app.querySelector('[data-twin-scene]')!.classList.add('is-fallback');
    if (message) app.querySelector('[data-fallback-message]')!.textContent = message;
    app.querySelectorAll<HTMLButtonElement>('[data-view], [data-tour], [data-reset]').forEach(button => button.disabled = true);
    app.querySelectorAll<HTMLInputElement>('[data-layer]').forEach(input => input.disabled = true);
  };
  import('./society-twin-scene').then(({ initSocietyTwin }) => initSocietyTwin(app, fallback)).catch(() => fallback());
}
