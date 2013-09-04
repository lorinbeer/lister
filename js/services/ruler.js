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
    
    // Handlers interpret rules pre selection
    // They can enforce intelligent behaviour, such as toggling mutually exclusive selections

    // mutually exlcusive selection
    var mexHandler = function(rule, tree, context) {
        for (opt in context.entry.options) {
            tree.remove(context.entry.options[opt].name);
        }
        tree.add(context.selection);
        return true; 
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
    // max value handler 
    var maxHandler = function(rule, tree, context) {
        var count = 0;
        for (opt in context.entry.options) {
            if (tree._indexOf(context.entry.options[opt].name) >= 0) {
                count = count + 1;
            }
        }
        if (count <= rule.value) {
            tree.add(context.selection);
        }        
    };

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
                   'max' : {'handler': maxHandler, 'validator': maxEntryValidator}
                  },

        //
        interpret : function(rule, tree, context) {
            return rulerService.rulemap[rule.name].handler(rule, tree, context);
        },

        // 
        validate : function(rules, tree, context) {
            for (i in rules) {
                rulerService.rulemap[rule.name].validator(rule, tree, context);
                // search for rule target(s) in tree
                // apply rule targets
            }
        }
    };
    
    return rulerService;
});
