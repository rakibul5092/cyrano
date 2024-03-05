import { Pipe, PipeTransform } from '@angular/core';

/*
	Purpose: To use a component function as a pipe instead of creating different custom pipes for each template function
	Example 1:
		FROM: <span>{{ getDotColor( status ) }}</span>

		TO: <span>{{ status | pipeTemplateExpression:getDotColor }}

		OR: <span>{{ status | pipeTemplateExpressionv:getDotColor:this }}		// To bind component `this` as context
*/

// Ref: https://github.com/ArtemLanovyy/ngx-pipe-function
@Pipe({
  name: 'templateExpression',
})
export class TemplateExpression implements PipeTransform {
  transform(value: any, handler: (value: any) => any, context?: any): any {
    if (context) {
      return handler.call(context, value);
    }

    return handler(value);
  }
}
