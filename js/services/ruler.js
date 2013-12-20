/**
 *  Lister UI Framework, create complex menu systems through a JSON metadata syntax
 *  Copyright (C) 2013 Lorin Beer lorin.beer.dev@gmail.com
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.

 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Lister.factory('ListerRuler', function () {
    
    /** Handlers interpret rules pre selection
     *  They can enforce intelligent behaviour, such as toggling mutually exclusive selections
     */

    /**
     * mutually exclusive selection handler
     * apply a mutually exclusive selection of node and tree
     * ctx - context, with expected members
     *      datatree - tree the selection is from
     *      targettree - tree the selection is to be grafted on to
     *      node - node that was selected in datatree
     */
    var mexHandler = function(ctx) {
        var addr = ctx.datatree.address(ctx.node.id);

        // make sure node is part of the data tree        
        if (!ctx.datatree.lookup(addr)) { return false };

        // parent node address lookup
        var paddr = addr.split('.');
        paddr.pop();
        paddr = paddr.join('.');
        var parent = ctx.datatree.lookup(paddr);

        // remove and deselect any sibling nodes 
        parent.foreachchild(function (node, child, i) {
            if (child.id == ctx.node.id) {
                if (taddr=ctx.targettree.address(ctx.node.id)) {
                    ctx.targettree.prune(taddr);
                    child.selected = false;
                } else {
                    ctx.targettree.addchild(parent.id, child);
                    child.selected = true;
                }
            } else {
                child.selected = false;
                ctx.targettree.prune(ctx.targettree.address(child.id));
            }
        });
    };

    // minimum value selection
    var minHandler = function(rule, tree, context) {
        var count = 0;
        for (opt in context.entry.options) {
            if (tree._indexOf(context.entry.options[opt].name) >= 0) {
                count = count + 1;
            }
        }
        if (count > rule.value) {
            tree.add(context.selection);
        }
        return true;
    };

    /**
     * max selection handler
     * apply a selection under a max rule
     * ctx - context, with expected members
     *      datatree - tree the selection is from
     *      targettree - tree the selection is to be grafted on to
     *      node - node that was selected in datatree
     */
    var maxHandler = function(ctx) {
        var addr = ctx.datatree.address(ctx.node.id);
        // make sure node is part of the data tree        
        if (!ctx.datatree.lookup(addr)) { return false };

        // parent node address lookup
        var paddr = addr.split('.');
        paddr.pop();
        paddr = paddr.join('.');
        var parent = ctx.datatree.lookup(paddr);
        if (ctx.targettree.checkaddress(addr)) {
            ctx.node.selected = false;
            ctx.targettree.prune(addr); 
        } else {
            if (ctx.targettree.lookup(paddr).children.length < parseInt(ctx.rule.value)) {
                ctx.node.selected = true;
                ctx.targettree.addchild(parent.id, ctx.node); 
            } else {
                ctx.node.selected = false;
                /*
                ctx.node.selected = true;
                ctx.targettree.lookup(paddr).children.shift().selected = false;
                ctx.targettree.addchild(parent.id, ctx.node);
                */
            }
        }
    };

    // autoselect handler
    var autoselectHandler = function(rule, node) {
        
    };

    // track handler
    var trackHandler = function(rule, tree, context) {
        if (rule.action == 'add') {
        }
    }

    // Validators interpret rules post selection, and return false if validation fails 
    
    // mutually exclusive validator
    var mexValidator = function(rule, tree, context) {
        var target = tree.find(rule.target);
        
    };

    // min value validator
    var minEntryValidator = function(rule, tree, context) {
        var target = tree.find(rule.target);
        if (target.length() >= rule.value) {
            return true;
        }
    };

    // max value validator
    var maxEntryValidator = function(rule, tree, context) {
        var target = tree.find(rule.target);
        if (target.length() <= rule.value) {
            return true;
        }
    };

    var rulerService = {
        rulemap : {'mex' : {'handler': mexHandler, 'validator': mexValidator},
                   'min' : {'handler': minHandler, 'validator': minEntryValidator},
                   'max' : {'handler': maxHandler, 'validator': maxEntryValidator},
                   'require' : {'handler': function(){}, 'validator': function(){}},
                   'addTo' : {'handler': trackHandler}
                  },

        /**
         * apply a rule given a context of a node and tree
         * the results of applying the rule depends on the implementation of the rule handler 
         * 
         * rule - the rule to apply to node and tree
         * node -
         * tree - 
         */
        apply : function(ctx) {
            if (ctx.rule instanceof Array) {
                var rules = ctx.rule;
                for(i in rules) {
                    try {
                        ctx.rule = rules[i];
                        rulerService.rulemap[rules[i].name].handler(ctx);
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                return rulerService.rulemap[ctx.rule.name].handler(ctx);
            }
        },

        // 
        validate : function(obj) {
            obj.node
            for (i in rules) {
                rulerService.rulemap[rule.name].validator(rule, tree, context);
                // search for rule target(s) in tree
                // apply rule targets
            }
        }
    };
    
    return rulerService;
});
