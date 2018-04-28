const getCity = (lattitude,longitude) => {
    $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lattitude},${longitude}&key=AIzaSyCdTRyFXv4vXS8YZ3CWcLsuK2t0iEaIpLA`, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
} 