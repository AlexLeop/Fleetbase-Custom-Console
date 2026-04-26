import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class EscalasIndexController extends Controller {
    @tracked schedules = [];
}
