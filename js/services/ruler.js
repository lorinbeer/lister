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
        
    };
    // max value handler 
    var maxHandler = function(rule, tree, context) {
        var count = 0;
        for (opt in context.entry.options) {
            console.log(opt)
            if (tree._indexOf(context.entry.options[opt].name) >= 0) {
                count = count + 1;
            }
        }
        if (count < rule.value) {
            tree.add(context.selection);
        }        
    };
    var rulerService = {
        rulemap : {'mex' : mexHandler,
                   'min' : minHandler,
                   'max' : maxHandler
                  },
        interpret : function(rule, tree, context) {
            return rulerService.rulemap[rule.name](rule, tree, context);
        }
    };
    
    return rulerService;
});
