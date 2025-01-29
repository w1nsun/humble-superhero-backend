import { Global, Module } from '@nestjs/common';

import { SuperheroManagementModule } from './superhero-management';

@Global()
@Module({
  imports: [SuperheroManagementModule],
  exports: [SuperheroManagementModule],
})
export class DomainModule {}
