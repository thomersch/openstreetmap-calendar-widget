"use strict";

import Event from "../Event";
import Widget from "../Widget";

class List extends Widget {
  protected template: string =
    "<div class=\"osmcal-list__event__name\">{{ name }}</div>" +
    "<div class=\"osmcal-list__event__details\">{{ date.human }}{{#if location.short}} in {{ location.short }}{{/if}}</div>";

  public async display (): Promise<Event[]> {
    const events = await this.getEvents();

    if (events.length > 0) {
      const ul = document.createElement("ul");

      ul.className = "osmcal-list__list";

      this.element.append(ul);

      events.forEach((event: Event) => {
        const liElement = document.createElement("li");

        liElement.className = "osmcal-list__event";

        const aElement = document.createElement("a");

        aElement.href = event.url;
        aElement.target = "_blank";
        aElement.innerHTML = this.render(event);

        liElement.appendChild(aElement);

        ul.appendChild(liElement);
      });
    }

    return events;
  }
}

export { List as default };
