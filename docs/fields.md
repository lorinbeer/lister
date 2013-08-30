
parent - 
indicates which node this item should be placed under. Tree will be parsed until a node with this id is found, and a new node with this data will be placed under it. If no node is found with this id, then a new node under root will be created with this id, and the child placed under it.
example
tree:root:{foo,bar,man,q}
and a selection:{name:child,parent:man}
tree:root:{foo,bar,man:{child},q}

