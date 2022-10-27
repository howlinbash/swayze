import { Dispatch } from "redux";
import { Packet, Packets, PacketsConfig, PacketTypes } from "./types";

let dispatch: Dispatch<Packet>;

export const setDispatch = (d: Dispatch<Packet>) => {
  dispatch = d;
};

const generateType = (name: string): string => name.toUpperCase();

export const makePackets = (packetsConfig: PacketsConfig, active?: boolean) => {
  const packets: Packets = {};

  Object.entries(packetsConfig).forEach(([packetName, config]) => {
    const packet: Packet = { type: generateType(packetName), payload: {} };

    // Initialise writes' properties
    if ("props" in config) {
      config.props.forEach((key: string) => {
        packet[key] = null;
      });
    }

    const packetCreator = (args?: unknown) => {
      if (Array.isArray(args)) {
        args.forEach((arg, i) => {
          // Assign passed arguments to packets properties
          if ("props" in config) {
            packet[config.props[i]] = arg;
          } else {
            throw new Error(
              "packets props have not been defined in their config"
            );
          }
        });
      }
      return packet;
    };

    packets[packetName] = active
      ? (...args: unknown[]) => dispatch(packetCreator(args))
      : (...args: unknown[]) =>
          () =>
            dispatch(packetCreator(args));
  });

  return packets;
};

export const makeTypes = (packetsConfig: PacketsConfig) => {
  const types: PacketTypes = {};
  Object.keys(packetsConfig).forEach((key) => {
    types[key] = generateType(key);
  });
  return types;
};
