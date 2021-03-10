let dispatch;

export const setDispatch = d => {
  dispatch = d;
};

const generateType = name => name.toUpperCase();

export const makePackets = (packetsConfig, active) => {
  const packets = {};

  Object.entries(packetsConfig).forEach(([packetName, config]) => {
    const packet = { type: generateType(packetName) };

    // Initialise writes' properties
    if (config.props) {
      config.props.forEach(key => {
        packet[key] = null;
      });
    }

    const packetCreator = args => {
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

export const makeTypes = packetsConfig => {
  const types = {};
  Object.keys(packetsConfig).forEach(key => {
    types[key] = generateType(key);
  });
  return types;
};
