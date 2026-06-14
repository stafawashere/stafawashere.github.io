function typeHero(cmdEl, onDone) {
  const cmd = 'whoami --verbose';
  let i = 0;
  const tick = () => {
    if (i <= cmd.length) {
      cmdEl.textContent = cmd.slice(0, i);
      i++;
      setTimeout(tick, 65);
    } else {
      onDone && onDone();
    }
  };
  tick();
}

function startRotor(rotorEl) {
  const words = PORTFOLIO.rotor;
  let w = 0, j = 0, deleting = false;

  const loop = () => {
    const word = words[w];
    if (!deleting) {
      j++;
      rotorEl.textContent = word.slice(0, j);
      if (j === word.length) {
        deleting = true;
        setTimeout(loop, 1500);
        return;
      }
    } else {
      j--;
      rotorEl.textContent = word.slice(0, j);
      if (j === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        setTimeout(loop, 320);
        return;
      }
    }
    setTimeout(loop, deleting ? 38 : 78);
  };

  loop();
}

function animateHeroCount(el, target) {
  const duration = 1800;
  const start    = performance.now();

  const step = (now) => {
    const elapsed = now - start;
    const t       = Math.min(elapsed / duration, 1);
    const eased   = 1 - Math.pow(1 - t, 3);
    const val     = Math.round(eased * target);
    el.textContent = val.toLocaleString() + 'M+';
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// scramble-reveal, needs #hero-l1 and #hero-l2 spans in the h1
function bootHeroName(h1El) {
  const glyphs = '!<>-_\\/[]{}=+*^?#$%01ABCDEFGHKXZ';
  const startDelay = 140, dur = 510;
  const t0 = performance.now();

  const l1El = document.getElementById('hero-l1');
  const l2El = document.getElementById('hero-l2');
  if (!l1El || !l2El) return;

  const F1 = 'MAHFUJ', F2 = 'MUSTAFA';

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function reveal(word, t) {
    return word.split('').map((ch, i) => {
      const lock = 0.32 + (i / word.length) * 0.68;
      if (t >= lock) return ch;
      if (t < lock - 0.42) return ' '; // nbsp, keeps the width from collapsing
      return glyphs[(Math.random() * glyphs.length) | 0];
    }).join('');
  }

  const tick = () => {
    const t = clamp((performance.now() - t0 - startDelay) / dur, 0, 1);
    if (t >= 1) {
      l1El.textContent = F1;
      l2El.textContent = F2;
      return;
    }
    l1El.textContent = reveal(F1, t);
    l2El.textContent = reveal(F2, t);
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
