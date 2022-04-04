
MERCATOR={
    fromLatLngToPoint: function(latLng) {
      var siny = Math.min(Math.max(Math.sin(latLng.lat * (Math.PI / 180)),
          -.9999),
        .9999);
      return {
        x: 128 + latLng.lng * (256 / 360),
        y: 128 + 0.5 * Math.log((1 + siny) / (1 - siny)) * -(256 / (2 * Math.PI))
      };
    },
      
    fromPointToLatLng: function(point) {
  
      return {
        lat: (2 * Math.atan(Math.exp((point.y - 128) / -(256 / (2 * Math.PI)))) -
          Math.PI / 2) / (Math.PI / 180),
        lng: (point.x - 128) / (256 / 360) 
      };
      },
   
    getTileAtLatLng: function(latLng, zoom) {
      var t = Math.pow(2, zoom),
        s = 256 / t,
        p = this.fromLatLngToPoint(latLng);
      return {
        x: Math.floor(p.x / s),
        y: Math.floor(p.y / s),
        z: zoom
      };
    },
    
    getTileBounds: function(tile) {
      tile = this.normalizeTile(tile);
      var t = Math.pow(2, tile.z),
        s = 256 / t,
        sw = {
          x: tile.x * s,
          y: (tile.y * s) + s
        },
        ne = {
          x: tile.x * s + s, 
          y: (tile.y * s)
        },
        tile={
          x:tile.x,
          y:tile.y
        },
        size=0;
     
      return {
        sw: this.fromPointToLatLng(sw),
        ne: this.fromPointToLatLng(ne),
        tile: tile,
        size: 0
      }
    },
    normalizeTile: function(tile) {
      var t = Math.pow(2, tile.z);
      tile.x = ((tile.x % t) + t) % t;
      tile.y = ((tile.y % t) + t) % t;
      return tile;
    }
  
  }
  
  /** @constructor */
  function CoordMapType(tileSize) {
    this.tileSize = tileSize;
  }
  
    CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var tile = MERCATOR.normalizeTile({
        x: coord.x,
        y: coord.y,
        z: zoom
      }),
      tileBounds = MERCATOR.getTileBounds(tile);
    var p1 = new google.maps.LatLng(tileBounds.ne.lat, tileBounds.sw.lng);
    var p2 = new google.maps.LatLng(tileBounds.ne.lat, tileBounds.ne.lng);
    var p3 = new google.maps.LatLng(tileBounds.sw.lat, tileBounds.sw.lng);
    //alert(calcDistance(p1, p2));
    
    //calculates distance between two points in km's
    function calcDistance(p1, p2,p3) {
     return ((google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(6)*google.maps.geometry.spherical.computeDistanceBetween(p1, p3).toFixed(6)*10.7639).toFixed(2));
    }

    var div = ownerDocument.createElement('div');
      console.log(div);
    sizeOfTile = calcDistance(p1, p2,p3);
    tileBounds.size =calcDistance(p1, p2,p3);
    div.innerHTML =
      '<pre><strong>tile:\n[' + tile.x + ',' + tile.y + ']</strong>\
  \nbounds:{\nsw:[' + tileBounds.sw.lat + ',' + tileBounds.size + ',' + tileBounds.sw.lng + '],\
  \nne:[' + tileBounds.ne.lat + ',' + zoom + ',' + tileBounds.ne.lng + ']\n}</pre>';
    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    div.style.fontSize = '10';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px';
    div.style.borderColor = '#AAAAAA';
    //div.innerHTML = "";
    return div;

  };
  
  var map;
    function initMap() {
          var mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(13.084620, 80.210981)
    };
    map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
    r = new google.maps.Rectangle()
    
    // Insert this overlay map type as the first overlay map type at
    // position 0. Note that all overlay map types appear on top of
    // their parent base map.
    map.overlayMapTypes.insertAt(
      0, new CoordMapType(new google.maps.Size(256, 256)));
  
    google.maps.event.addListener(map, 'click', function(e) {
      console.log(map);
      var b = MERCATOR.getTileBounds(MERCATOR.getTileAtLatLng({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }, this.getZoom()));
      console.log(r);
      r.setOptions({
        bounds: new google.maps.LatLngBounds(new google.maps.LatLng(b.sw.lat, b.sw.lng), new google.maps.LatLng(b.ne.lat, b.ne.lng)),
        map: map
      })
      var popupdisplay = document.getElementById("popupdisplay");
   popupdisplay.style.visibility="visible";
      popup(b);
    });
    google.maps.event.addListener(map, 'zoom_changed', function() {
      r.setMap(null);
    });
  }
    //calculates distance between two points in m's
    function calcDistance(p1, p2,p3) {
     return ((google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(6)*google.maps.geometry.spherical.computeDistanceBetween(p1, p3).toFixed(6)*10.7639).toFixed(2));
    }
  
   var global;
  function popup(b){
    var p1 = new google.maps.LatLng(b.ne.lat, b.sw.lng);
    var p2 = new google.maps.LatLng(b.ne.lat, b.ne.lng);
    var p3 = new google.maps.LatLng(b.sw.lat, b.sw.lng);
    //alert(calcDistance(p1, p2));
  
   b.size = calcDistance(p1, p2,p3);
  global = b;
  var e=document.getElementById('popup');
  e.innerHTML = '<div>Bounds</div> <div> SW:'+ b.sw.lat+','+ b.sw.lng+';, </div>\n <div> NE:'+b.ne.lat+','+ b.ne.lng+',\n</div> <div>Size:'+b.size +
  ' Sqft </div>';
  }
    //calculates distance between two points in km's
    function calcDistance(p1, p2,p3) {
        return ((google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(6)*google.maps.geometry.spherical.computeDistanceBetween(p1, p3).toFixed(6)*10.7639).toFixed(2));
    }

  document.getElementById('mint').onclick = function() {
  console.log(global);
    $.ajax({
          type: "POST",
          url: "http://127.0.0.1:4000/transaction",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify({"from":"bd748a5a5479649cfd83132d3be99d0c1a2ebadc1e4c405e","to":"3be24b8dccf3c0a171c76b092e2a95f6e9d387eac6b647f1","x": global.tile.x,"y": global.tile.y}),
          success: function(data){console.log(data);},
          failure: function(errMsg) {
              alert(errMsg);
          }
    });
  
      $.ajax({
          type: "GET",
          url: "http://127.0.0.1:4000/blockchain",
          success: function(data){console.log(data);
           dataview(data);
          },
          failure: function(errMsg) {
              alert(errMsg);
          }
    });
  };
  
  
  function dataview(data){
        var str = "<table>";
        var tstr = "";
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].transactions.length; j++) {
       var tx = data[i].transactions[j];
       tstr += "<tr><td>"+ tx.from+"</td><td>"+tx.to+"</td><td>"+tx.x+"</td><td>"+tx.y+"</td></tr>";
      }
    }
      str = str + tstr + "</table>";
    var div = document.createElement("div");
    div.innerHTML = str;
  document.getElementById("mapdata").appendChild(div);
  }
  
  document.getElementById('close').onclick = function() {
  
  var popup = document.getElementById("popupdisplay");
   popup.style.visibility="hidden";
  };
  
  