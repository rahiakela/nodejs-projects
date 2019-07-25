import { IsInt, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly price: number;
}
