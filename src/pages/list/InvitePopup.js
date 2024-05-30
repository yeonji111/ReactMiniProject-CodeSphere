import { useEffect, useState } from "react";
import axios from "axios";

export default function InvitePopup(props) {
  const { onClose } = props;

  const userid = JSON.parse(localStorage.getItem("login")).userid;

  // 취소 버튼 이벤트
  const goCancle = () => {
    onClose({ close: true });
  };

  useEffect(() => {
    checkManager();
  }, [userid]);

  // 쿼리
  const [manager, setManager] = useState("");
  const [groupid, setGroupid] = useState("");
  console.log("팝업창에서 확인id ===> ", userid);
  const checkManager = async () => {
    const res = await axios.post("/api/list", {
      url: "checkManager",
      userid: userid,
    });

    // query문으로 result가 정상적으로 넘어오는 경우
    if (res.data.manager == "권한없음") {
      setManager(false);
      // alert("초대 권한이 없습니다.");
    } else if (res.data.manager == "권한있음") {
      setManager(true);
      setGroupid(res.data.groupid);
      // alert("초대 권한이 있습니다.");
    }
  };

  // 확인용 alert
  useEffect(() => {
    if (groupid != "") {
      // alert(manager, groupid);
      // alert(groupid);
    }
  }, [groupid]);

  // 초대장 보내는 이벤트
  const goSend = async () => {
    // 로그인 유저가 매니저 권한을 가지고 있는 경우
    // 로그인 유저의 group_id를 클릭된 회원의 그룹 아이디에 넣고,
    // inviteGroup 쿼리 실행
    if (manager) {
      const res = await axios.post("/api/list", {
        url: "inviteGroup",
        userid: userid,
        groupid: groupid,
      });
      // 쿼리 정상 실행
      if (res.data == "초대완료") {
        alert("초대 완료");
      } else if (res.data == "초대실패") {
        alert("초대 실패");
      }
    }
  };
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div>
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">그룹 초대하기</h2>
            <p className="text-sm text-gray-500 px-8">
              그룹에 초대하여 함께 활동하겠습니까?
            </p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={goSend}
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            >
              SEND
            </button>
            <button
              onClick={goCancle}
              className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
            >
              CANCLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
