import { NgModule } from '@angular/core';
import { CourseCardModule } from './course-card/course-card.module';
import { InfoCardModule } from './info-card/info-card.module';
import { ItineraryCardModule } from './itinerary-card/itinerary-card.module';
import { LessonCardModule } from './lesson-card/lesson-card.module';
import { LocationCardModule } from './location-card/location-card.module';
import { UpcomingDateCardModule } from './upcoming-date-card/upcoming-date-card.module';
import { VideoCardModule } from './video-card/video-card.module';

@NgModule({
  imports: [CourseCardModule, InfoCardModule, LessonCardModule, VideoCardModule, UpcomingDateCardModule, ItineraryCardModule, LocationCardModule],
  exports: [CourseCardModule, InfoCardModule, LessonCardModule, VideoCardModule, UpcomingDateCardModule, ItineraryCardModule, LocationCardModule],
})
export class CardsModule {}
