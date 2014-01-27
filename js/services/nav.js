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

Lister.factory('ListerNavService', function ($http, ListerDataService) {
    var _defaultIndexStr_ = '/index';

    function navSelect() {}
    function navCreate() {}
    function navListView(){}

    function loadData(entry, data) {
        var controller = 'menu',
            uri;
            
            if (entry.action == 'create') {
                // create mode
                ListerDataService.create();
            }
              
            if (data.options) {
                controller = 'selection';
            }

           // format uri to angular friendly (no routing wild cards, ffffffuuuuuuuuuuuuu)
           uri = entry.uri.split('/');
           uri = uri.join('.');
           // update state
           history.push(uri);
           currentdata = data;
           window.location.href = '#/' + controller  +'/' + uri;
    }

    var history = [];
    var currentdata = null;
    var navServiceObject = {
        'nav' : function (entry) {
            $http.get('data/' + entry.uri + '.json')
                .success(function(data) {
                    loadData(entry, data); 
            })
            .error(function(data, status, headers, config) {
                // if the entry uri was not a data file, check if there is an index file
                if (entry.uri.search('/index') != -1) {
                    console.log(entry.uri.search(_defaultIndexStr_), (entry.uri.length) - 6);
                    navServiceObject.nav(entry);
                }
                else {
                    entry.uri = entry.uri + _defaultIndexStr_;
                    navServiceObject.nav(entry);
                }
            });

        },

        'up' : function () {
            console.log(navServiceObject.getCurrentUri());
            var addr = navServiceObject.getCurrentUri();
            addr = addr.split('.');
            // shift off any whitespace at the beginning of address    
            while (addr[0] == '' ) { addr.shift() };
            // if the page is an index page, pop to the index of the last dir
            if (addr[addr.length-1] == 'index') {
                addr.pop(); addr.pop();
                addr.push('index');
            } else { 
                addr.pop() 
            }
            navServiceObject.nav({'uri' : addr.join('/')});
        },

        'current' : function () {
            // return the most current entry in the history
            return currentdata;
        },

        // retrieve the uri from the address bar
        'getCurrentUri' : function () {
            var addr = window.location.href,
                uri = '';
            addr = addr.split('/');
            // return the first non-empty string after the split, expected is 2 iterations
            while (addr.length > 0) {
                uri = addr.pop();
                if (uri != '') {
                    break;
                }
            }
            return uri;
        }
          
    };
    return navServiceObject
});
