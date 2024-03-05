import { NgModule } from '@angular/core';
import { HeightRangeFormatterPipe } from './height-range-formatter.pipe';
import { TemplateExpression } from './template-expression';
import { TimeAgoPipe } from './time-ago.pipe';
import { DomPurifyPipe } from './dom-purify.pipe';
import { SafeContent } from './safe.pipe';

const pipes = [HeightRangeFormatterPipe, TemplateExpression, TimeAgoPipe, SafeContent];
@NgModule({
  declarations: [...pipes, DomPurifyPipe],
  exports: [...pipes, DomPurifyPipe],
})
export class PipesModule {}
