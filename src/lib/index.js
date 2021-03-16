let dispatch;

export const setDispatch = (d) => {
  dispatch = d;
};

const generateType = (name) => name.toUpperCase();

export const makePackets = (packetsConfig, active) => {
  const packets = {};

  Object.entries(packetsConfig).forEach(([packetName, config]) => {
    const packet = { type: generateType(packetName) };

    // Initialise writes' properties
    if (config.props) {
      config.props.forEach((key) => {
        packet[key] = null;
      });
    }

    const packetCreator = (args) => {
      if (args.length) {
        args.forEach((arg, i) => {
          // Assign passed arguments to write properties
          packet[config.props[i]] = arg;
        });
      }
      return packet;
    };

    packets[packetName] = active
      ? (...args) => dispatch(packetCreator(args))
      : (...args) => () => dispatch(packetCreator(args));
  });

  return packets;
};

export const makeTypes = (packetsConfig) => {
  const types = {};
  Object.keys(packetsConfig).forEach((key) => {
    types[key] = generateType(key);
  });
  return types;
};

const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

export const requestInterval = function (fn, delay) {
  if (
    !window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(
      window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame
    ) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame
  )
    return window.setInterval(fn, delay);

  let start = new Date().getTime(),
    handle = {};

  function loop() {
    const current = new Date().getTime(),
      delta = current - start;

    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }

    handle.value = requestAnimFrame(loop);
  }

  handle.value = requestAnimFrame(loop);
  return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
export const clearRequestInterval = function (handle) {
  window.cancelAnimationFrame
    ? window.cancelAnimationFrame(handle.value)
    : window.webkitCancelAnimationFrame
    ? window.webkitCancelAnimationFrame(handle.value)
    : window.webkitCancelRequestAnimationFrame
    ? window.webkitCancelRequestAnimationFrame(
        handle.value
      ) /* Support for legacy API */
    : window.mozCancelRequestAnimationFrame
    ? window.mozCancelRequestAnimationFrame(handle.value)
    : window.oCancelRequestAnimationFrame
    ? window.oCancelRequestAnimationFrame(handle.value)
    : window.msCancelRequestAnimationFrame
    ? window.msCancelRequestAnimationFrame(handle.value)
    : clearInterval(handle);
};
