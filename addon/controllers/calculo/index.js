import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CalculoIndexController extends Controller {
    @tracked drivers = [];
    @tracked selectedDriverId = null;
    @tracked weekStart = null;
    @tracked weekEnd = null;
    @tracked result = null;

    @action
    onDriverChange(event) {
        this.selectedDriverId = event.target.value;
    }

    @action
    onWeekStartChange(event) {
        this.weekStart = event.target.value;
    }

    @action
    onWeekEndChange(event) {
        this.weekEnd = event.target.value;
    }

    @action
    calculate() {
        // TODO: conectar com API
    }
}
