import { IsDefined, IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class TickerDataDto {
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly c: string[];
}
