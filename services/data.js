{
  "ruleChainId": {
  "entityType": "RULE_CHAIN",
    "id": "061ef600-6831-11ea-a56e-fd5e0ea8fd27"
},
  "firstNodeIndex": 2,
  "nodes":
  [{
  "id": {
    "entityType": "RULE_NODE",
    "id": "9cc3a630-6833-11ea-a56e-fd5e0ea8fd27"
  },
  "createdTime": 1584438147091,
  "additionalInfo": {
    "description": "dsa",
    "layoutX": 330,
    "layoutY": 495
  },
  "ruleChainId": {
    "entityType": "RULE_CHAIN",
    "id": "061ef600-6831-11ea-a56e-fd5e0ea8fd27"
  },
  "type": "org.thingsboard.rule.engine.transform.TbChangeOriginatorNode",
  "name": "123",
  "debugMode": false,
  "configuration": {
    "originatorSource": "CUSTOMER",
    "relationsQuery": {
      "direction": "FROM",
      "maxLevel": 1,
      "filters": [{
        "relationType": "Contains",
        "entityTypes": []
      }],
      "fetchLastLevelOnly": false
    }
  }
}, {
  "id": {
    "entityType": "RULE_NODE",
    "id": "6b0fc2f0-6832-11ea-a56e-fd5e0ea8fd27"
  },
  "createdTime": 1584437634207,
  "additionalInfo": {
    "layoutX": 329,
    "layoutY": 360
  },
  "ruleChainId": {
    "entityType": "RULE_CHAIN",
    "id": "061ef600-6831-11ea-a56e-fd5e0ea8fd27"
  },
  "type": "org.thingsboard.rule.engine.transform.TbChangeOriginatorNode",
  "name": "444",
  "debugMode": false,
  "configuration": {
    "originatorSource": "CUSTOMER",
    "relationsQuery": {
      "direction": "FROM",
      "maxLevel": 1,
      "filters": [{
        "relationType": "Contains",
        "entityTypes": []
      }],
      "fetchLastLevelOnly": false
    }
  }
}, {
  "id": {
    "entityType": "RULE_NODE",
    "id": "08e39ed0-6832-11ea-a56e-fd5e0ea8fd27"
  },
  "createdTime": 1584437469501,
  "additionalInfo": {
    "layoutX": 375,
    "layoutY": 163
  },
  "ruleChainId": {
    "entityType": "RULE_CHAIN",
    "id": "061ef600-6831-11ea-a56e-fd5e0ea8fd27"
  },
  "type": "org.thingsboard.rule.engine.metadata.TbGetCustomerAttributeNode",
  "name": "test",
  "debugMode": false,
  "configuration": {
    "attrMapping": {
      "temperature": "tempo"
    },
    "telemetry": false
  }
}, {
  "id": {
    "entityType": "RULE_NODE",
    "id": "08e4fe60-6832-11ea-a56e-fd5e0ea8fd27"
  },
  "createdTime": 1584437469510,
  "additionalInfo": {
    "layoutX": 779,
    "layoutY": 106
  },
  "ruleChainId": {
    "entityType": "RULE_CHAIN",
    "id": "061ef600-6831-11ea-a56e-fd5e0ea8fd27"
  },
  "type": "org.thingsboard.rule.engine.transform.TbChangeOriginatorNode",
  "name": "1111",
  "debugMode": false,
  "configuration": {
    "originatorSource": "CUSTOMER",
    "relationsQuery": {
      "direction": "FROM",
      "maxLevel": 1,
      "filters": [{
        "relationType": "Contains",
        "entityTypes": []
      }],
      "fetchLastLevelOnly": false
    }
  }
}],
  "connections": [{
  "fromIndex": 1,
  "toIndex": 0,
  "type": "Success"
}, {
  "fromIndex": 2,
  "toIndex": 3,
  "type": "Success"
}, {
  "fromIndex": 2,
  "toIndex": 1,
  "type": "Success"
}],
  "ruleChainConnections": [{
  "fromIndex": 0,
  "targetRuleChainId": {
    "entityType": "RULE_CHAIN",
    "id": "f75a5d40-673a-11ea-a56e-fd5e0ea8fd27"
  },
  "additionalInfo": {
    "layoutX": 729,
    "layoutY": 458,
    "ruleChainNodeId": "rule-chain-node-7"
  },
  "type": "Success"
}, {
  "fromIndex": 0,
  "targetRuleChainId": {
    "entityType": "RULE_CHAIN",
    "id": "f75a5d40-673a-11ea-a56e-fd5e0ea8fd27"
  },
  "additionalInfo": {
    "layoutX": 699,
    "layoutY": 616,
    "ruleChainNodeId": "rule-chain-node-8"
  },
  "type": "Failure"
}]
}
