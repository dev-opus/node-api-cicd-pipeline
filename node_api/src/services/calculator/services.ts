import { CalculatorUtility, Service } from '../../commons';
import * as RequestSchema from './schema/request';

class IPCalculator extends Service {
  private calculator: CalculatorUtility;

  constructor(sn: string) {
    super(sn);
    this.calculator = new CalculatorUtility();
  }

  /**
   *
   * @description Evaluate a given IP address
   *
   */
  evaluateAddress(payload: RequestSchema.EvaluateAddressPayload) {
    const { address } = payload;

    const [host, cidr] = address.split('/');
    const subnet = this.calculator.cidrToSubnet(+cidr);
    const network = this.calculator.computeNetwork(host, subnet);
    const subnetDetails = this.calculator.computeSubnetDetails(subnet);

    const data = {
      cidr: '/' + cidr,
      host,
      subnet,
      network,
      address,
      ...subnetDetails,
    };

    this.log('evaluate address', { address });
    return data;
  }
}

export default new IPCalculator('IPCalculator');
