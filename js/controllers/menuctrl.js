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

/**
 *
 */
function MenuCtrl($scope, $http, ListerNavService, ListerDataService) {
    
    if (!ListerNavService.current()) {
        ListerNavService.nav({'uri':'index'});
    }

    var data = ListerNavService.current();
    
    // if data still isn't valid, then we have no index or default page to load, and we should error out gracefully
    if (data) {
        $scope.MenuEntries = data;
    } else {

    }

    var address = ListerNavService.getCurrentUri(),
        selectTree = ListerDataService._currentlist,
        currentpage = '';


    if (address == 'index') {
        
    } else {

        address = address.split('.');
        currentpage = address.pop();

        if ( selectTree != null ) {
            // if
            address.join('.');
            var str = 'root.' + address.join('.');
            if ( selectTree.checkaddress( str )) {
                $scope.sublist = selectTree.lookup(str);
                console.log(selectTree.lookup(str));
            }
        }
    }

    $scope.back = function(entry) {
        console.log('backy back');
        ListerNavService.up(); 
    }    

    $scope.nav = function(entry) {
        ListerNavService.nav(entry); 
    }
}
