export class CalculatorUtility {
  /**
   *
   * @description Compute a network ID from a given IP host and subnet mask
   *
   */
  computeNetwork(host: string, subnet: string) {
    const subnetParts = subnet.split('.');
    const hostParts = host.split('.');

    const networkParts: string[] = [];

    hostParts.forEach((part, index) => {
      const networkPart = Number(part) & Number(subnetParts[index]);
      networkParts.push(networkPart.toString());
    });

    return networkParts.join('.');
  }

  /**
   *
   * @description Convert CIDR to a subnet mask using bitwise ANDing
   *
   */
  cidrToSubnet(cidr: number) {
    const subnetParts: string[] = [];

    // basic anding
    while (cidr >= 8) {
      subnetParts.push('255');
      cidr -= 8;
    }

    if (subnetParts.length === 4) {
      return subnetParts.join('.');
    }

    // binary anding
    const binaryParts = [];

    while (cidr > 0) {
      binaryParts.push('1');
      cidr -= 1;
    }

    while (binaryParts.length < 8) {
      binaryParts.push('0');
    }

    const binary = binaryParts.join('');
    subnetParts.push(parseInt(binary, 2).toString());

    while (subnetParts.length < 4) {
      subnetParts.push('0');
    }

    return subnetParts.join('.');
  }

  /**
   *
   * @description Compute extra subnet details: block_size and changing_octet
   *
   */
  computeSubnetDetails(subnet: string) {
    const subnetParts = subnet.split('.');

    const changingOctectIndex = subnetParts.findIndex((part) => part !== '255');

    const changingOctet = +subnetParts[changingOctectIndex];

    const subnet_block_size = changingOctet ? 256 - changingOctet : 256;
    const changing_octet_position = changingOctet ? changingOctectIndex + 1 : 4;

    return {
      subnet_block_size,
      changing_octet_position,
    };
  }
}
