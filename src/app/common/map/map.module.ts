import { MapComponent } from "./map.component";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
@NgModule({
  imports: [MapComponent, AgmCoreModule],
  exports: [MapComponent],
  declarations: []
})
export class MapModule {}
