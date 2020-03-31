import {Node} from 'topology-core/models/node';
import {Rect} from 'topology-core/models/rect';

export function customerAttributesIconRect(node) {

  node.iconRect = new Rect(node.rect.x+15, node.rect.center.y-node.imageHeight/2 , node.rect.width, node.imageHeight);
  node.fullIconRect = node.rect;
}

export function customerAttributesTextRect(node) {

  node.textRect = new Rect(
    node.rect.x +50,
    node.rect.y+node.rect.height-30,
    (node.rect.width * 5) / 7,
    30
  );
  node.fullTextRect = node.textRect;

}
