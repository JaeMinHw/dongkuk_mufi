function check_numm() {
	pinSlots = document.getElementsByClassName('pinSlot');
	result = '';
	for (let idx = 0; idx < pinSlots.length; idx++) {
		if (pinSlots[idx].value == '') {
			i = idx + 1;
			alert(i + ' 번째 핀 번호를 입력해주세요');
			return;
		} else
		result += pinSlots[idx].value;
	}
	restApi(result);
}

function move(e, p, c, n) {
	var length = document.getElementById(c).value.length;
	var maxlength = document.getElementById(c).getAttribute("maxlength");

	if (length == maxlength) {
		if (n !== "") {
			document.getElementById(n).focus();
		}

	}
	if (e.key === "Backspace") {
		if (p !== "") {
			document.getElementById(p).focus();
		}

	}
}

function restApi(num) {
  $.ajax({
    type: 'GET',
    url:"http://www.muinfilm.shop/kiosk/pin/"+num,
    dataType : 'text',
    success: function(data){
        // success -> 인증성공 Alert 출력
        // 인증성공시 비활성화하기
        const obj = JSON.parse(data);

        if(obj.isSuccess == 'True') {
          // 세션에 저장해서 가지고 있기
          sessionStorage.setItem('orderName',obj.orderName); //유저 아이디
          sessionStorage.setItem('orderId',obj.orderId); //주문번호
          var pa = obj.orderName;
          let pase = pa.split(' ');
          sessionStorage.setItem('what_frame',pase[0][0]); // 어떤 상품?
          sessionStorage.setItem('count',pase[2][0]); // 매수
          sessionStorage.setItem('pin',num); // 핀번호

          if(sessionStorage.getItem('what_frame') === '4') // 상품 번호가 4컷
          {
            location.href="Kiosk_choose_frame_4.html";
          }
          else if(sessionStorage.getItem('what_frame') === '6')  // 상품 번호가 6컷
          {
            location.href="Kiosk_choose_frame_6.html";
          }
          else {
            alert("실패");
          }
  
        }
        else if( obj.isSuccess == '이미 사용된번호 입니다.') {
          alert("이미 사용한 번호입니다. 다시 확인하여주세요.");
        }
        else {
          // 다시 확인하라는 alert 출력하기
          alert("잘 못 된 번호입니다. 다시 확인하여주세요.")
        }
        
},
    error: function(result){
        // error -> 인증실패 Alert 출력
        alert('오류입니다. 다시 시도 후 문제가 또 발생하면 안내자에게 문의해주세요.')
        // 인증실패시 에러메시지 출력
    }
})
}



