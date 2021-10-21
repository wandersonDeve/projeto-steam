import { BaseQueryParametersDto } from 'src/shared/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  username: string;
  email: string;
  status: boolean;
  role: string;
}
