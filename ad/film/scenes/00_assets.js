// generated + provided assets (loaded once, before any shot draws)
(() => {
  INITS.push(async () => {
    await loadImg('pRoom', 'assets/01-light-room.jpg');
    await loadImg('pFeet', 'assets/02-feet.jpg');
    await loadImg('pHands', 'assets/03-hands.jpg');
    await loadImg('pBokeh', 'assets/04-bokeh.jpg');
    await loadImg('logolamsat', 'assets/logo-lamsat.png');
    await loadImg('logowamd', 'assets/logo-wamd.png');
  });
})();
