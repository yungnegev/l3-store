import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './hints.tpl.html';


export class Hints {
  view: View;
  searchPrompts: string[];
  
  constructor(props: any) {
    this.searchPrompts = props.searchPrompts || [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(searchPrompts: string[]) {
    this.searchPrompts = searchPrompts;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';
    this.view.root.innerHTML = this._makeSentence();
  }

  private _makeSentence() {
    const sentence = `Например,
                      <a href="#"><span class="hilight">${this.searchPrompts[0]}</span></a>,
                      <a href="#"><span class="hilight">${this.searchPrompts[1]}</span></a> или
                      <a href="#"><span class="hilight">${this.searchPrompts[2]}</span></a>`;
    return sentence;
  }
}