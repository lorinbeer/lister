# Rules
rules allow list validation. They can occur at a global level, or locally on a particular selection.


The examples use the following example list data
{
    "bruisers" : { 
        "name" : "Bruisers", 
        "source" : [{"name" : "Basher", "type" : "bruiser", "value" : "3"},
                    {"name" : "Beater", "type" : "bruiser", "value" : "4"},
                    {"name" : "Masher", "type" : "bruiser", "value" : "5"}]
    },
    "stabbers" : {
        "name" : "Stabbers",
        "source" : [{"name" : "Ganker", "type" : "bruiser", "value" : "4"},
                    {"name" : "Shooter", "type" : "bruiser", "value" : "5"},
                    {"name" : "Shiver", "type" : "bruiser", "value" : "6"}]

    },
    "sparkers" : {
        "name" : "Sparkers",
        "source" : [{"name" : "Burner", "type" : "bruiser", "value" : "5"},
                    {"name" : "Beamer", "type" : "bruiser", "value" : "6"},
                    {"name" : "Slagger", "type" : "bruiser", "value" : "7"}]
    }
}

 
## rule syntax

    { "target" : "<id>", "rule" : "<rule-name>", "value" : "<val>" }

where:
target: the list/id which this rule is to apply to. Lister will apply this rule to any node with the "bruiser" id
rule: the rule to apply to target, see below for rules
value: optional parameter to the rule

## max-children
maximum number of children this node is allowed to have

    { "target" : "bruisers", "rule" : "max-children", "value" : "5" }

where:
target : this rule will apply to all nodes with .type = "bruisers" in the tree
rule: here we specify max-children as the rule to apply, nodes of type "bruiser" can have the specified number of children
value: the maximum number of children this type of node can have

## min-children
minimum number of children this node is allowed to have
    { "target" : "bruisers", "rule" : "min-children", "value" : "1" }
where:
target : this rule will apply to all nodes with .type = "bruisers" in the tree
rule: here we specify max-children as the rule to apply, nodes of type "bruiser" can have the specified number of children
value: the maximum number of children this type of node can have
example:

    { "target" : "bruisers", "rule" : "min-children", "value" : "1" }

nodes of type = "bruisers" must have at least one child in order to be valid


## max-value
    { "rule" : "max-value", "target" : "<id>", "type" : "<type>", "value" : "<n>" }
target must have value summing to "<n>"

## min-value


## cannot

example:
    {"rule":"cannot", "target" : "sparks", "value" : "bruiser"}
nodes of type "sparks" cannot have "bruisers" children

example:
instead of single values, you can provide an array as the value to specify more than one "cannot" at once
    {"rule":"cannot", "target" : "sparks", "value" : ["bruiser", "stabbers"]}
nodes of type "sparks" cannot have "bruisers" or "stabbers"

## require
specifies that another node must be selected for this selection to be valid
example
    {"rule":"require", "target" : "<target>"}
where "<target>" is the name or id of another node
# directives
directives modify the logic of a rule, making the rule syntax much more expressive

## "and" directive

compatible rules:
- cannot
    {"rule":"cannot", "directive":"and", "target" : "sparks", "value" : ["bruiser", "stabber"]}
node of type "sparks" cannot have bruisers and stabbers at the same time, but can have bruiser children as long as there are no stabber children and stabber children as long as there are no bruiser children

## "or" directive
compatible rules:
- cannot, default

## "xor"

## "xand"
