import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
    @tracked totalDrivers = 0;
    @tracked totalSchedules = 0;
    @tracked totalEntries = '0,00';
    @tracked totalCredits = '0,00';
    @tracked recentEntries = [];
}
