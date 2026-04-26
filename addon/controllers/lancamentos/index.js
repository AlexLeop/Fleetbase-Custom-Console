import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class LancamentosIndexController extends Controller {
    @tracked entries = [];
}
