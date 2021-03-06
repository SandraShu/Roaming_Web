    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            //是否使用高精度定位，默认:true
            timeout: 10000,          
            //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),
            //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      
            //定位成功后调整地图视野范围使定位位置及精度范围视野内可见
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);
        //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      
        //返回定位出错信息

        
    });
    //解析定位结果
    function onComplete(data) {
        var str=['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        str.push('精度：' + data.accuracy + ' 米');
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        //document.getElementById('tip').innerHTML = str.join('<br>');
        console.log('经度：' + data.position.getLng()+'纬度：' + data.position.getLat());

        AMap.service(["AMap.PlaceSearch"], function() {
            var placeSearchShop = new AMap.PlaceSearch({ 
                //构造地点查询类
                pageSize: 5,
                type: '购物服务',
                pageIndex: 1,
                city: "028", 
                map: map,
                panel: "panel"
            });

            var placeSearchFood = new AMap.PlaceSearch({ 
                //构造地点查询类
                pageSize: 5,
                type: '餐饮服务',
                pageIndex: 1,
                city: "028", 
                map: map,
                panel: "panel"
            });

            var placeSearchLife = new AMap.PlaceSearch({ 
                //构造地点查询类
                pageSize: 5,
                type: '生活服务',
                pageIndex: 1,
                city: "028", 
                map: map,
                panel: "panel"
            });
        
            var cpoint = [data.position.getLng(), data.position.getLat()]; 

            placeSearchShop.searchNearBy('', cpoint, 500, function(status, result){
                console.log('购物服务:');
                console.log(result.poiList.pois);
            });

            placeSearchFood.searchNearBy('', cpoint, 500, function(status, result){
                console.log('餐饮服务:');
                console.log(result.poiList.pois);
            });

            placeSearchLife.searchNearBy('', cpoint, 500, function(status, result){
                console.log('生活服务:');
                console.log(result.poiList.pois);
            });
        });
    }
    //解析定位错误信息
    function onError(data) {
        console.log('定位失败');
    }
    