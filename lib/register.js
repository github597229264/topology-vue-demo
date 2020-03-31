import { registerNode } from 'topology-core/middles';
import { inputControl,inputControlIconRect,inputControlTextRect,inputControlAnchors } from './topology-custom-control/ruleChainControl';
import { ruleChainControl,ruleChainControlIconRect,ruleChainControlTextRect,ruleChainControlAnchors } from './topology-custom-control/inputControl';
import { checkExistenceFields,checkExistenceFieldsIconRect,checkExistenceFieldsTextRect,checkExistenceFieldsAnchors } from './topology-custom-control/checkExistenceFields';
import { customerAttributes,customerAttributesIconRect,customerAttributesTextRect,customerAttributesAnchors } from './topology-custom-control/customerAttributes';
//注册图形
export function register() {
  registerNode('ruleChainControl',  ruleChainControl,ruleChainControlIconRect,ruleChainControlTextRect,ruleChainControlAnchors);
  registerNode('inputControl',  inputControl,inputControlIconRect,inputControlTextRect,inputControlAnchors);
  registerNode('checkExistenceFields',  checkExistenceFields,checkExistenceFieldsIconRect,checkExistenceFieldsTextRect,checkExistenceFieldsAnchors);
  registerNode('customerAttributes',  customerAttributes,customerAttributesIconRect,customerAttributesTextRect,customerAttributesAnchors);
}
