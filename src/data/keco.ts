// KECO 직종 코드 (한국고용직업분류)
export const KECO_CODES = [
  // 경영·사무·금융·보험직
  { code: "011", label: "의회의원·고위공무원및기업고위임원", category: "경영·사무·금융·보험직" },
  { code: "012", label: "행정·경영·금융·보험관리자", category: "경영·사무·금융·보험직" },
  { code: "013", label: "전문서비스관리자", category: "경영·사무·금융·보험직" },
  { code: "014", label: "미용·여행·숙박·음식·경비·청소관리자", category: "경영·사무·금융·보험직" },
  { code: "015", label: "영업·판매·운송관리자", category: "경영·사무·금융·보험직" },
  { code: "016", label: "건설·채굴·제조·생산관리자", category: "경영·사무·금융·보험직" },
  { code: "021", label: "정부행정전문가및관련종사자", category: "경영·사무·금융·보험직" },
  { code: "022", label: "경영·인사전문가", category: "경영·사무·금융·보험직" },
  { code: "023", label: "회계·세무·감정전문가", category: "경영·사무·금융·보험직" },
  { code: "024", label: "광고·조사·상품기획·행사기획전문가", category: "경영·사무·금융·보험직" },
  { code: "025", label: "정부행정사무원", category: "경영·사무·금융·보험직" },
  { code: "026", label: "경영지원사무원", category: "경영·사무·금융·보험직" },
  { code: "027", label: "회계·경리사무원", category: "경영·사무·금융·보험직" },
  { code: "028", label: "무역·운송·생산·품질사무원", category: "경영·사무·금융·보험직" },
  { code: "029", label: "안내·고객상담·통계·비서및기타사무원", category: "경영·사무·금융·보험직" },
  // 금융·보험직
  { code: "031", label: "금융·보험전문가", category: "금융·보험직" },
  { code: "032", label: "금융·보험사무원", category: "금융·보험직" },
  { code: "033", label: "금융·보험영업원", category: "금융·보험직" },
  // 연구직
  { code: "110", label: "인문·사회과학연구원", category: "연구직" },
  { code: "121", label: "자연과학연구원및시험원", category: "연구직" },
  { code: "122", label: "생명과학연구원및시험원", category: "연구직" },
  // 정보통신연구개발직
  { code: "131", label: "컴퓨터하드웨어·통신공학기술자", category: "정보통신연구개발직" },
  { code: "132", label: "컴퓨터시스템전문가", category: "정보통신연구개발직" },
  { code: "133", label: "소프트웨어개발자", category: "정보통신연구개발직" },
  { code: "134", label: "네트워크시스템개발자및정보보안전문가", category: "정보통신연구개발직" },
  { code: "135", label: "데이터전문가", category: "정보통신연구개발직" },
  { code: "136", label: "정보시스템및웹운영자", category: "정보통신연구개발직" },
  { code: "137", label: "통신·방송송출장비기사", category: "정보통신연구개발직" },
  // 건설·채굴공학기술직
  { code: "140", label: "건축·토목공학기술자및시험원", category: "건설·채굴공학기술직" },
  // 제조공학기술직
  { code: "151", label: "기계·로봇공학기술자및시험원", category: "제조공학기술직" },
  { code: "152", label: "금속·재료공학기술자및시험원", category: "제조공학기술직" },
  { code: "153", label: "전기·전자공학기술자및시험원", category: "제조공학기술직" },
  { code: "154", label: "화학공학기술자및시험원", category: "제조공학기술직" },
  { code: "155", label: "에너지·환경공학기술자및시험원", category: "제조공학기술직" },
  { code: "156", label: "섬유공학기술자및시험원", category: "제조공학기술직" },
  { code: "157", label: "식품공학기술자및시험원", category: "제조공학기술직" },
  { code: "158", label: "소방·방재·산업안전·비파괴기술자", category: "제조공학기술직" },
  { code: "159", label: "제도사및기타공학기술자", category: "제조공학기술직" },
  // 교육직
  { code: "211", label: "대학교수및강사", category: "교육직" },
  { code: "212", label: "학교교사", category: "교육직" },
  { code: "213", label: "유치원교사", category: "교육직" },
  { code: "214", label: "문리·기술·예능강사", category: "교육직" },
  { code: "215", label: "장학관및기타교육종사자", category: "교육직" },
  // 법률직
  { code: "221", label: "법률전문가", category: "법률직" },
  { code: "222", label: "법률사무원", category: "법률직" },
  // 사회복지·종교직
  { code: "231", label: "사회복지사및상담사", category: "사회복지·종교직" },
  { code: "232", label: "보육교사및기타사회복지종사자", category: "사회복지·종교직" },
  { code: "233", label: "성직자및기타종교종사자", category: "사회복지·종교직" },
  // 경찰·소방·교도직
  { code: "240", label: "경찰관소방관및교도관", category: "경찰·소방·교도직" },
  // 군인
  { code: "250", label: "군인", category: "군인" },
  // 보건의료직
  { code: "301", label: "의사한의사및치과의사", category: "보건의료직" },
  { code: "302", label: "수의사", category: "보건의료직" },
  { code: "303", label: "약사및한약사", category: "보건의료직" },
  { code: "304", label: "간호사", category: "보건의료직" },
  { code: "305", label: "영양사", category: "보건의료직" },
  { code: "306", label: "의료기사·치료사·재활사", category: "보건의료직" },
  { code: "307", label: "보건·의료종사자", category: "보건의료직" },
  // 예술·디자인·방송직
  { code: "411", label: "작가·통번역가", category: "예술·디자인·방송직" },
  { code: "412", label: "기자및언론전문가", category: "예술·디자인·방송직" },
  { code: "413", label: "학예사·사서·기록물관리사", category: "예술·디자인·방송직" },
  { code: "414", label: "창작·공연전문가", category: "예술·디자인·방송직" },
  { code: "415", label: "디자이너", category: "예술·디자인·방송직" },
  { code: "416", label: "연극·영화·방송전문가", category: "예술·디자인·방송직" },
  { code: "417", label: "문화·예술기획자및매니저", category: "예술·디자인·방송직" },
  // 스포츠직
  { code: "420", label: "스포츠·레크리에이션종사자", category: "스포츠직" },
  // 미용·예식·반려동물직
  { code: "511", label: "미용서비스원", category: "미용·예식·반려동물직" },
  { code: "512", label: "결혼·장례등예식서비스원", category: "미용·예식·반려동물직" },
  { code: "513", label: "반려동물서비스원", category: "미용·예식·반려동물직" },
  // 여행·숙박·오락직
  { code: "521", label: "여행서비스원", category: "여행·숙박·오락직" },
  { code: "522", label: "항공기·선박·열차객실승무원", category: "여행·숙박·오락직" },
  { code: "523", label: "숙박시설서비스원", category: "여행·숙박·오락직" },
  { code: "524", label: "오락시설서비스원", category: "여행·숙박·오락직" },
  // 음식서비스직
  { code: "531", label: "주방장및조리사", category: "음식서비스직" },
  { code: "532", label: "식당서비스원", category: "음식서비스직" },
  // 경호·경비직
  { code: "541", label: "경호·보안종사자", category: "경호·경비직" },
  { code: "542", label: "경비원", category: "경호·경비직" },
  // 돌봄서비스직
  { code: "550", label: "돌봄서비스종사자", category: "돌봄서비스직" },
  // 청소·기타서비스직
  { code: "561", label: "청소종사자", category: "청소·기타서비스직" },
  { code: "562", label: "세정원및방역원", category: "청소·기타서비스직" },
  { code: "563", label: "가사서비스원", category: "청소·기타서비스직" },
  { code: "564", label: "검침·주차관리및기타서비스단순종사자", category: "청소·기타서비스직" },
  // 영업·판매직
  { code: "611", label: "부동산컨설턴트및중개사", category: "영업·판매직" },
  { code: "612", label: "기술·해외영업원및상품중개인", category: "영업·판매직" },
  { code: "613", label: "자동차및제품영업원", category: "영업·판매직" },
  { code: "614", label: "텔레마케터", category: "영업·판매직" },
  { code: "615", label: "판매종사자", category: "영업·판매직" },
  { code: "616", label: "매장계산원및매표원", category: "영업·판매직" },
  { code: "617", label: "판촉및기타판매단순종사자", category: "영업·판매직" },
  // 운전·운송직
  { code: "621", label: "항공기·선박·철도조종사및관제사", category: "운전·운송직" },
  { code: "622", label: "자동차운전원", category: "운전·운송직" },
  { code: "623", label: "물품이동장비조작원", category: "운전·운송직" },
  { code: "624", label: "택배원및기타운송종사자", category: "운전·운송직" },
  // 건설·채굴직
  { code: "701", label: "건설구조기능원", category: "건설·채굴직" },
  { code: "702", label: "건축마감기능원", category: "건설·채굴직" },
  { code: "703", label: "배관공", category: "건설·채굴직" },
  { code: "704", label: "건설·채굴기계운전원", category: "건설·채굴직" },
  { code: "705", label: "기타건설기능원", category: "건설·채굴직" },
  { code: "706", label: "건설·채굴단순종사자", category: "건설·채굴직" },
  // 기계설치·정비·생산직
  { code: "811", label: "기계장비설치·정비원", category: "기계설치·정비·생산직" },
  { code: "812", label: "운송장비정비원", category: "기계설치·정비·생산직" },
  { code: "813", label: "금형원및공작기계조작원", category: "기계설치·정비·생산직" },
  { code: "814", label: "냉·난방설비조작원", category: "기계설치·정비·생산직" },
  { code: "815", label: "자동조립라인·산업용로봇조작원", category: "기계설치·정비·생산직" },
  { code: "816", label: "기계조립원", category: "기계설치·정비·생산직" },
  { code: "817", label: "운송장비조립원", category: "기계설치·정비·생산직" },
  // 금속·재료생산직
  { code: "821", label: "금속관련기계·설비조작원", category: "금속·재료생산직" },
  { code: "822", label: "판금원및제관원", category: "금속·재료생산직" },
  { code: "823", label: "단조원및주조원", category: "금속·재료생산직" },
  { code: "824", label: "용접원및용접기조작원", category: "금속·재료생산직" },
  { code: "825", label: "도장원및도금원", category: "금속·재료생산직" },
  { code: "826", label: "비금속제품생산기계조작원", category: "금속·재료생산직" },
  // 전기·전자생산직
  { code: "831", label: "전기공", category: "전기·전자생산직" },
  { code: "832", label: "전기·전자기기설치·수리원", category: "전기·전자생산직" },
  { code: "833", label: "발전·배전장치조작원", category: "전기·전자생산직" },
  { code: "834", label: "전기·전자설비조작원", category: "전기·전자생산직" },
  { code: "835", label: "전기·전자부품·제품생산기계조작원", category: "전기·전자생산직" },
  { code: "836", label: "전기·전자부품·제품조립원", category: "전기·전자생산직" },
  // 정보통신설치·정비직
  { code: "841", label: "정보통신기기설치·수리원", category: "정보통신설치·정비직" },
  { code: "842", label: "방송·통신장비설치·수리원", category: "정보통신설치·정비직" },
  // 화학·환경생산직
  { code: "851", label: "석유·화학물가공장치조작원", category: "화학·환경생산직" },
  { code: "852", label: "고무·플라스틱및화학제품생산기계조작원및조립원", category: "화학·환경생산직" },
  { code: "853", label: "환경관련장치조작원", category: "화학·환경생산직" },
  // 섬유·의복생산직
  { code: "861", label: "섬유제조·가공기계조작원", category: "섬유·의복생산직" },
  { code: "862", label: "패턴사재단사및재봉사", category: "섬유·의복생산직" },
  { code: "863", label: "의복제조원및수선원", category: "섬유·의복생산직" },
  { code: "864", label: "제화원기타섬유·의복기계조작원및조립원", category: "섬유·의복생산직" },
  // 식품가공·생산직
  { code: "871", label: "제과·제빵원및떡제조원", category: "식품가공·생산직" },
  { code: "872", label: "식품가공기능원", category: "식품가공·생산직" },
  { code: "873", label: "식품가공기계조작원", category: "식품가공·생산직" },
  // 인쇄·목재·공예직
  { code: "881", label: "인쇄기계·사진현상기조작원", category: "인쇄·목재·공예직" },
  { code: "882", label: "목재·펄프·종이생산기계조작원", category: "인쇄·목재·공예직" },
  { code: "883", label: "가구·목제품제조·수리원", category: "인쇄·목재·공예직" },
  { code: "884", label: "공예원및귀금속세공원", category: "인쇄·목재·공예직" },
  { code: "885", label: "악기·간판및기타제조종사자", category: "인쇄·목재·공예직" },
  // 제조단순직
  { code: "890", label: "제조단순종사자", category: "제조단순직" },
  // 농림어업직
  { code: "901", label: "작물재배종사자", category: "농림어업직" },
  { code: "902", label: "낙농·사육종사자", category: "농림어업직" },
  { code: "903", label: "임업종사자", category: "농림어업직" },
  { code: "904", label: "어업종사자", category: "농림어업직" },
  { code: "905", label: "농림어업단순종사자", category: "농림어업직" },
] as const;
