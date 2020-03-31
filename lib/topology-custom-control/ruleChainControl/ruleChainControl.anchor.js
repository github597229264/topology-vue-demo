import {Point} from 'topology-core/models/point'
import {Node} from 'topology-core/models/node'
import {Direction} from 'topology-core/models/direction'
import { AnchorMode } from 'topology-core/models/status';

export function ruleChainControlAnchors(node) {
  node.anchors.push(
    new Point(
      node.rect.x,
      node.rect.y + node.rect.height / 2,
      Direction.Left
    )
  );
  node.anchors[0].mode = AnchorMode.In;//左侧锚点只允许in（作为终点)
};
