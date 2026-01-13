import { Module } from '@nestjs/common';
import { AxiosAdapter } from './httpAdapters/axios.adapter';
import { PaginationDto } from './dto/pagination.dto';

@Module({
  providers: [AxiosAdapter, PaginationDto],
  exports: [AxiosAdapter, PaginationDto],
})
export class CommonModule {}
