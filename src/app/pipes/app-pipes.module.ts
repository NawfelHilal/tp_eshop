import { NgModule } from "@angular/core";
import { SearchPipe, SortByDatePipe, SortByNamePipe } from "./product.pipe";

@NgModule({
  declarations: [SortByDatePipe, SearchPipe, SortByNamePipe],
  exports: [SortByDatePipe, SearchPipe, SortByNamePipe],
})
export class AppPipesModule {}
