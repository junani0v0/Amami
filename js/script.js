
// ============ 공용으로 사용하는 부분 / 共通で使用する部分 ================ 

const headerContent = `
<header
        class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#EEEEEE] px-10 py-3"
    >
        <div class="flex items-center gap-4">
            <a href="index.html">
                <img
                    src="images/logo.png"
                    alt="Amami Logo"
                    class="h-12 object-contain"
                />
            </a>
        </div>
        <div class="flex items-center gap-4 relative">
            <!-- 다국어 버튼 / 多言語ボタン-->
            <div
                id="languageSelector"
                style="display: flex; align-items: center"
            >
                <button
                    id="languageIcon"
                    onclick="toggleDropdown(event)"
                    onKeyDown="if(event.key === 'Enter' || event.key === ' ') toggleDropdown(event);"
                    style="
                        cursor: pointer;
                        background: none;
                        border: none;
                        padding: 0;
                    "
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm3.222,7H8.778A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7Zm.8,2a10.211,10.211,0,0,1,.476,3,10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2,12a9.986,9.986,0,0,1,.461-3H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461A9.986,9.986,0,0,1,2,12Zm1.353,5H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm5.425,0h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm5.827,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM22,12a9.986,9.986,0,0,1-.461,3H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437A9.986,9.986,0,0,1,22,12ZM17.426,7a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7Z"
                        ></path>
                    </svg>
                </button>

                <div
                    id="languageDropdown"
                    style="
                        display: none;
                        position: absolute;
                        top: 40px;
                        left: 0;
                        z-index: 10;
                        background: white;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    "
                >
                    <div
                        onclick="selectLanguage('ja')"
                        style="padding: 10px; cursor: pointer"
                    >
                        日本語
                    </div>
                    <div
                        onclick="selectLanguage('en')"
                        style="padding: 10px; cursor: pointer"
                    >
                        English
                    </div>
                    <div
                        onclick="selectLanguage('kr')"
                        style="padding: 10px; cursor: pointer"
                    >
                        한국어
                    </div>
                </div>
            </div>

            <div
                id="selectedLang"
                onclick="toggleDropdown(event)"
                style="
                    cursor: pointer;
                    margin-left: 5px;
                    display: flex;
                    align-items: center;
                "
            >
                <!-- 기본 언어 표시 / 基本言語を表示 -->
            </div>
            <!-- 검색 페이지 버튼 / 検索ページボタン-->
            <a
                href="index.html"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-black text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-800"
            >
                Search Page
            </a>
        </div>
    </header>
`;

const footerContent = `
<footer class="flex justify-center">
    <div class="flex max-w-[960px] flex-1 flex-col">
        <div class="flex flex-col gap-6 px-5 py-10 text-center @container">
            <p class="text-[#6B6B6B] text-base font-normal leading-normal">Powered by
                <a href="http://webservice.recruit.co.jp/">ホットペッパーグルメ Webサービス</a>
            </p>
        </div>
    </div>
</footer>
`;

//JSON 파일 경로 설정 / JSONファイルのパス設定
const translations = {
    ja: 'json/ja.json', // 일본어 JSON 파일 경로 / 日本語のJSONファイルパス
    kr: 'json/kr.json', // 한국어 JSON 파일 경로 / 韓国語のJSONファイルパス
    en: 'json/en.json'  // 영어 JSON 파일 경로 / 英語のJSONファイルパス
};

//기본 언어 설정 (로컬 스토리지에서 불러오기) / デフォルトの言語設定（ローカルストレージから取得）
let currentLang = localStorage.getItem('language') || 'ja'; // 로컬 스토리지에서 언어 가져오기, 없으면 일본어로 설정 / ローカルストレージから言語を取得、なければ日本語に設定

//언어 데이터 로드 함수 / 言語データのロード関数
function loadLanguage(lang) {
    fetch(translations[lang]) // 선택된 언어의 JSON 파일을 가져옴 / 選択された言語のJSONファイルを取得
        .then(response => response.json()) // JSON 파일을 파싱 / JSONファイルをパース
        .then(data => {
            // 데이터 키에 따라 텍스트 업데이트 / データキーに基づいてテキストを更新
            document.querySelectorAll("[data-i18n]").forEach(element => {
                const key = element.getAttribute("data-i18n");
                if (data[key]) {
                    element.innerText = data[key]; // 해당 키에 맞는 텍스트로 변경 / そのキーに対応するテキストに変更
                }
            });

            // 데이터 키에 따라 플레이스홀더 업데이트 / データキーに基づいてプレースホルダーを更新
            document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
                const key = element.getAttribute("data-i18n-placeholder");
                if (data[key]) {
                    element.setAttribute("placeholder", data[key]); // 해당 키에 맞는 플레이스홀더로 변경 / そのキーに対応するプレースホルダーに変更
                }
            });
        })
        .catch(error => console.error('Error loading language:', error)); // 오류 처리 / エラー処理
}

//드롭다운 토글 함수 / ドロップダウンのトグル関数
function toggleDropdown(event) {
    const dropdown = document.getElementById('languageDropdown');
    const expanded = dropdown.style.display === 'block';
    dropdown.style.display = expanded ? 'none' : 'block';
    document.getElementById('languageIcon').setAttribute('aria-expanded', !expanded);
}

//언어 선택 함수 / 言語選択関数
function selectLanguage(lang) {
    currentLang = lang; // 현재 언어 업데이트 / 現在の言語を更新
    localStorage.setItem('language', currentLang); // 로컬 스토리지에 언어 저장 / ローカルストレージに言語を保存
    loadLanguage(currentLang); // 선택된 언어 로드 / 選択された言語をロード

    // 현재 선택된 언어 표시 업데이트 / 現在選択された言語表示を更新
    let selectedLangText;
    if (currentLang === 'kr') {
        selectedLangText = '한국어';
    } else if (currentLang === 'ja') {
        selectedLangText = '日本語';
    } else {
        selectedLangText = 'English';
    }

    document.getElementById('selectedLang').innerText = selectedLangText;

    // 드롭다운 닫기 / ドロップダウンを閉じる
    document.getElementById('languageDropdown').style.display = 'none'; // 선택 후 드롭다운 닫기 / 選択後ドロップダウンを閉じる
}


//드롭다운 외부 클릭 시 드롭다운 숨기기 / ドロップダウンの外部をクリックした時にドロップダウンを非表示
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('languageDropdown');
    const languageIcon = document.getElementById('languageIcon');
    const selectedLang = document.getElementById('selectedLang');

    if (!languageIcon.contains(event.target) && !dropdown.contains(event.target) && !selectedLang.contains(event.target)) {
        dropdown.style.display = 'none'; // 드롭다운 숨기기 / ドロップダウンを非表示
    }
});

// 페이지 로드 시 기본 언어 로드 / ページロード時にデフォルトの言語をロード
window.onload = () => {
    loadLanguage(currentLang); // 기본 언어 로드 / デフォルトの言語をロード

    // 초기 언어 표시 / 初期言語の表示
    let selectedLangText;
    if (currentLang === 'kr') {
        selectedLangText = '한국어';
    } else if (currentLang === 'ja') {
        selectedLangText = '日本語';
    } else {
        selectedLangText = 'English';
    }
    
    document.getElementById('selectedLang').innerText = selectedLangText;
};


// ================ index.html에서 사용하는 부분 / index.htmlで使用する部分 ==================

// 플래그 초기화 / フラグ初期化
let hasInitialized = false;

// 검색 버튼 클릭 시 호출되는 함수 정의 / 検索ボタンがクリックされた時に呼び出される関数の定義
function handleSearch() {
    let hasError = false;

    // 입력된 위치 정보를 가져오기 / 入力された位置情報を取得
    const latitudeInput = document.getElementById('latitudeInput').value.trim();
    const longitudeInput = document.getElementById('longitudeInput').value.trim();
    
    // 선택된 검색 반경 라디오 버튼 값 가져오기 / 選択された検索範囲のラジオボタンの値を取得
    const selectedRadius = document.querySelector('input[name="radius"]:checked');
    // 선택된 정렬 기준 라디오 버튼 값 가져오기 / 選択されたソート基準のラジオボタンの値を取得
    const selectedSortOrder = document.querySelector('input[name="sortOrder"]:checked');
    // 선택된 장르 드롭다운 값 가져오기 / 選択されたジャンルのドロップダウンの値を取得
    const selectedGenre = document.getElementById('genreSelect').value;

    // 위도 및 경도 값 검증 / 緯度および経度の値の検証
    const latitudeValid = validateLatitude();  // 위도 값이 유효한지 확인 / 緯度の値が有効か確認
    const longitudeValid = validateLongitude();  // 경도 값이 유효한지 확인 / 経度の値が有効か確認

    if (!latitudeValid || !longitudeValid) {
        hasError = true;  // 위도나 경도가 유효하지 않으면 오류 플래그 설정 / 緯度や経度が無効な場合、エラーフラグを設定
    }

    // 검색 반경 선택 검증 / 検索範囲選択の検証
    if (!selectedRadius) {
        const message = document.querySelector('[data-i18n="radiusAlert"]').textContent; 
        showError('radius-warning', message); 
        hasError = true;  // 검색 반경 선택 오류 / 検索範囲の選択エラー
    } else {
        hideError('radius-warning');  // 오류가 없으면 경고 숨김 / エラーがなければ警告を隠す
    }

    // 정렬 기준 선택 검증 / ソート基準選択の検証
    if (!selectedSortOrder) {
        const message = document.querySelector('[data-i18n="sortAlert"]').textContent; 
        showError('sort-warning', message); 
        hasError = true;  // 정렬 기준 선택 오류 / ソート基準の選択エラー
    } else {
        hideError('sort-warning');  // 오류가 없으면 경고 숨김 / エラーがなければ警告を隠す
    }


    if (hasError) {
        return;  // 오류가 있으면 검색 중단 / エラーがあれば検索を中断
    }

    // API 요청을 위한 URL 파라미터 준비 / APIリクエストのためのURLパラメータの準備
    let url;
    if (latitudeInput && longitudeInput) {
        // 위도와 경도 모두 입력된 경우 / 緯度と経度が両方入力された場合
        url = `result.html?lat=${latitudeInput}&lng=${longitudeInput}&radius=${selectedRadius.value}&order=${selectedSortOrder.value}&genre=${selectedGenre}`;
    } else {
        return;  // 위도, 경도 또는 위치 정보가 없으면 함수 종료 / 緯度、経度または位置情報がない場合は関数を終了
    }

    // 결과 페이지로 이동 / 結果ページに移動
    window.location.href = url;
}

// 경고 메시지 표시 함수 / 警告メッセージ表示関数
function showError(elementId, message) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.textContent = message;
        targetElement.classList.remove('hidden');  // 경고 메시지 표시 / 警告メッセージを表示
    }
}

// 경고 메시지 숨김 함수 / 警告メッセージ非表示関数
function hideError(elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.classList.add('hidden');  // 경고 메시지 숨기기 / 警告メッセージを隠す
    }
}

// 위도 검증 함수 / 緯度検証関数
function validateLatitude() {
    const latitudeInput = document.getElementById('latitudeInput');
    const latitudeWarning = document.getElementById('latitudeWarning');
    let value = latitudeInput.value;

    // 소수점 자릿수 계산 함수 / 小数点以下の桁数を計算する関数
    function decimalPlaces(value) {
        if (Math.floor(value) === parseFloat(value)) return 0; // 정수일 경우 소수점 없음 / 整数の場合は小数点以下なし
        return value.split(".")[1]?.length || 0; // 소수점 자리수 계산 / 小数点以下の桁数を計算
    }

    // 유효하지 않은 경우 경고 표시 / 無効な場合は警告を表示
    if (!value || isNaN(value) || value < -90 || value > 90 || decimalPlaces(value) > 15) {
        latitudeWarning.classList.remove('hidden');  // 경고 메시지 표시 / 警告メッセージを表示
        latitudeInput.value = value.slice(0, -1); // 마지막 입력을 제거하여 유효성 유지 / 最後の入力を削除して有効性を維持
        return false;  // 유효하지 않음 / 無効
    } else {
        latitudeWarning.classList.add('hidden');  // 경고 메시지 숨기기 / 警告メッセージを隠す
        return true;  // 유효함 / 有効
    }
}

// 경도 검증 함수 / 経度検証関数
function validateLongitude() {
    const longitudeInput = document.getElementById('longitudeInput');
    const longitudeWarning = document.getElementById('longitudeWarning');
    let value = longitudeInput.value;

    // 소수점 자릿수 계산 함수 / 小数点以下の桁数を計算する関数
    function decimalPlaces(value) {
        if (Math.floor(value) === parseFloat(value)) return 0; // 정수일 경우 소수점 없음 / 整数の場合は小数点以下なし
        return value.split(".")[1]?.length || 0; // 소수점 자리수 계산 / 小数点以下の桁数を計算
    }

    // 유효하지 않은 경우 경고 표시 / 無効な場合は警告を表示
    if (!value || isNaN(value) || value < -180 || value > 180 || decimalPlaces(value) > 15) {
        longitudeWarning.classList.remove('hidden');  // 경고 메시지 표시 / 警告メッセージを表示
        longitudeInput.value = value.slice(0, -1); // 마지막 입력을 제거하여 유효성 유지 / 最後の入力を削除して有効性を維持
        return false;  // 유효하지 않음 / 無効
    } else {
        longitudeWarning.classList.add('hidden');  // 경고 메시지 숨기기 / 警告メッセージを隠す
        return true;  // 유효함 / 有効
    }
}

// DOM 로드 후 header와 footer를 삽입 / DOMロード後、ヘッダーとフッターを挿入
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('header').innerHTML = headerContent;
    document.getElementById('footer').innerHTML = footerContent;

    // index.html에서 Google Places API를 로드
    if (window.location.pathname.includes('index.html')) {
        window.onload = loadGooglePlacesApi;
    }
    // result.html에서 Google Maps API를 로드
    if (window.location.pathname.includes('result.html')) {
        window.onload = loadGoogleMapsApi;
    }

    // 언어 데이터 로드
    loadLanguage(currentLang);

    // 초기 언어 표시 설정
    document.getElementById('selectedLang').innerText = currentLang === 'kr' ? '한국어' : currentLang === 'ja' ? '日本語' : 'English';


    // 페이지가 result.html인 경우에만 모달 관련 코드 실행
    if (window.location.pathname.includes('result.html')) {
        const modal = document.getElementById('restaurantModal');

        // 모달 외부 클릭 시 모달 닫기
        if (modal) {
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.classList.add('hidden');
                }
            });

            // 모달이 열린 후 스크롤을 맨 위로 설정
            modal.addEventListener("shown.bs.modal", function () {
                const modalContent = document.querySelector(".modal-content");
                if (modalContent) {
                    modalContent.scrollTop = 0;
                }
            });
        }

        // 길안내 버튼 클릭 이벤트 추가
        const navigateButton = document.getElementById('navigateButton');
        if (navigateButton) {
            navigateButton.addEventListener('click', function() {
                // URL에서 사용자의 위도와 경도 값을 가져오기
                const params = new URLSearchParams(window.location.search);
                const userLat = parseFloat(params.get('userLat')) || validUserLat;
                const userLng = parseFloat(params.get('userLng')) || validUserLng;

                // 레스토랑 위치 가져오기
                const destLat = restaurantLat;
                const destLng = restaurantLng;

                // 사용자 위치와 목적지로 길안내 호출
                if (userLat !== null && userLng !== null && destLat !== null && destLng !== null) {
                    openGoogleMapsNavigation(userLat, userLng, destLat, destLng);
                } else {
                    console.error('위치 정보가 올바르지 않습니다.');
                }
            });
        }
    }

    // result.html에서만 검색 결과 이벤트 추가
    if (window.location.pathname.includes('result.html') && !hasInitialized) {
        initResultPage();  // result.html에서만 실행
        hasInitialized = true;  // 초기화 완료
    }

    // 검색 반경과 정렬 기준 라디오 버튼 이벤트 리스너 추가
    document.querySelectorAll('input[name="radius"]').forEach((radio) => {
        radio.addEventListener('change', () => hideError('radius-warning'));
    });
    document.querySelectorAll('input[name="sortOrder"]').forEach((radio) => {
        radio.addEventListener('change', () => hideError('sort-warning'));
    });

    // 위치 가져오기 버튼 클릭 시 이벤트 설정
    const locationButton = document.getElementById('locationButton');
    const latitudeInput = document.getElementById('latitudeInput');
    const longitudeInput = document.getElementById('longitudeInput');

    if (locationButton) {
        locationButton.addEventListener('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
    
                    latitudeInput.value = latitude;
                    longitudeInput.value = longitude;
    
                    // 위치 관련 경고 숨김
                    hideError('latitudeWarning');
                    hideError('longitudeWarning');
    
                }, function (error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("위치 정보 제공이 거부되었습니다.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("위치 정보를 이용할 수 없습니다.");
                            break;
                        case error.TIMEOUT:
                            alert("위치 정보 요청이 시간 초과되었습니다.");
                            break;
                        default:
                            alert("위치 정보 조회 중 알 수 없는 오류가 발생했습니다.");
                    }
                });
            } else {
                alert('현재 브라우저에서 위치 서비스를 지원하지 않습니다.');
            }
        });
    }    
});


// Google Maps Places API 자동완성 / Google Maps Places API 自動補完
function initAutocomplete() {
    const input = document.getElementById('locationInput');
    const autocomplete = new google.maps.places.Autocomplete(input);

    // 사용자가 주소를 선택하면 발생하는 이벤트 리스너 / ユーザーが住所を選択した時に発生するイベントリスナー
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        
        // 장소가 유효한 경우, 위도와 경도 값 가져오기 / 場所が有効な場合、緯度と経度の値を取得
        if (place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // 위도, 경도 값을 해당 입력 필드에 넣기 / 緯度、経度の値を対応する入力フィールドに入力
            document.getElementById('latitudeInput').value = lat;
            document.getElementById('longitudeInput').value = lng;

            // 경고 메시지 숨기기 추가 / 警告メッセージを隠す追加
            hideError('latitudeWarning');
            hideError('longitudeWarning');
        } else {
            console.log('No details available for input: ' + input.value); // 입력에 대한 세부 정보가 없음 / 入力に対する詳細情報がありません。
        }
    });

    // 자동완성 목록이 나타날 때 발생하는 이벤트 / 自動補完リストが表示された時に発生するイベント
    input.addEventListener('keydown', function () {
        setTimeout(function () {
            const pacContainer = document.querySelector('.pac-container');
            if (pacContainer) {
                pacContainer.classList.add('custom-autocomplete-list');
            }
        }, 100);
    });    
}


// ================= result.html에서 사용하는 부분 / result.htmlで使用する部分 ================= 

// 전역 변수로 사용자 위치 저장 / グローバル変数でユーザー位置を保存
let userLatitude = null; 
let userLongitude = null;

// 검색 결과 페이지 초기화 함수 / 検索結果ページの初期化関数
function initResultPage() {
    const params = new URLSearchParams(window.location.search);

    // lat, lng 값을 URL에서 가져와서 숫자로 변환하여 사용 / lat, lngの値をURLから取得して数値に変換して使用
    userLatitude = parseFloat(params.get('lat'));  // 위도 저장 / 緯度を保存
    userLongitude = parseFloat(params.get('lng')); // 경도 저장 / 経度を保存

    // URL에 lat, lng 값이 없거나 유효하지 않으면 사용자의 현재 위치를 가져옴 / URLにlat, lngの値がないか無効な場合、ユーザーの現在位置を取得
    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        // Geolocation API를 사용하여 사용자의 위치를 가져옵니다. / Geolocation APIを使用してユーザーの位置を取得
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;

                console.log('ユーザーの現在位置:', userLatitude, userLongitude); // ユーザーの現在位置

                // 사용자의 현재 위치를 URL에 추가하여 페이지 새로고침 또는 이후 이동 시 위치 유지 / ユーザーの現在位置をURLに追加し、ページ更新または移動後も位置を維持
                const updatedUrl = updateUrlParameter('lat', userLatitude);
                window.history.replaceState(null, null, updateUrlParameter('lng', userLongitude));

                // 사용자 위치로 검색을 수행합니다. / ユーザー位置で検索を実行
                executeSearch(userLatitude, userLongitude);
            }, function(error) {
                console.error('位置情報取得中にエラーが発生しました:', error); // 位置情報取得中にエラーが発生しました
                alert('位置情報を利用できません'); // 位置情報を利用できません
            });
        } else {
            console.error('Geolocationをサポートしないブラウザです'); // Geolocationをサポートしないブラウザです
            alert('位置情報を利用できないブラウザです'); // 位置情報を利用できないブラウザです
        }
    } else {
        // URL에서 가져온 값이 유효하면 해당 값을 사용하여 검색 수행 / URLから取得した値が有効ならその値を使って検索を実行
        executeSearch(userLatitude, userLongitude);
    }
}

// 사용자의 위치나 URL에서 가져온 위도/경도를 사용하여 검색을 수행하는 함수
// ユーザーの位置やURLから取得した緯度/経度を使って検索を実行する関数
function executeSearch(lat, lng) {
    const params = new URLSearchParams(window.location.search);
    const searchRadius = params.get('radius') || '3'; // 기본값 3 (1km) / デフォルト値3 (1km)
    const sortOrder = params.get('order') || '4'; // 기본값 4 (추천 순) / デフォルト値4 (おすすめ順)
    const genre = params.get('genre') || ''; // 장르 파라미터 가져오기 / ジャンルパラメータを取得
    const currentPage = parseInt(params.get('page')) || 1; // 현재 페이지 번호 / 現在のページ番号

    // 각 요소가 존재하는지 확인하고 값을 설정 / 各要素が存在するか確認し、値を設定
    const radiusSelect = document.getElementById('radiusSelect');
    if (radiusSelect) {
        radiusSelect.value = searchRadius;
    }

    const sortOrderSelect = document.getElementById('sortOrderSelect');
    if (sortOrderSelect) {
        sortOrderSelect.value = sortOrder;
    }

    const genreSelect = document.getElementById('genreSelect');
    if (genreSelect) {
        genreSelect.value = genre;
    }

    // 위도와 경도를 이용해 서버로 검색 요청 수행 / 緯度と経度を使ってサーバーに検索リクエストを送信
    searchByCoordinates(lat, lng, searchRadius, sortOrder, genre, currentPage);
}

// 위도와 경도로 식당 검색을 수행하는 함수
// 緯度と経度でレストラン検索を実行する関数
function searchByCoordinates(lat, lng, radius, order, genre, page) {
    // 서버로 요청을 보내 Hot Pepper API에 대신 요청을 처리하게 함 / サーバーにリクエストを送り、Hot Pepper APIに代わりにリクエストを処理させる
    const apiUrl = `/api/restaurants?lat=${lat}&lng=${lng}&radius=${radius}&order=${order}&genre=${genre}&page=${page}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.results.shop) {
            const totalResults = data.results.results_available;
            displayResults(data.results.shop, page, totalResults);  // 검색 결과 표시 / 検索結果を表示
            addClickEventToResults(data.results.shop);  // 검색 결과 클릭 이벤트 추가 / 検索結果にクリックイベントを追加
        } else {
            displayResults([], page, 0);
        }
    })
    .catch(error => {
        console.error('검색 중에 에러 발생:', error);  // 검색 중에 에러 발생 / 検索中にエラーが発生
        alert('検索中にエラーが発生しました。もう一度お試しください。');  // 검색 중 에러 발생 메시지 / 検索中にエラーが発生しました。再度お試しください。
    });
}

// 검색 결과를 화면에 동적으로 표시하는 함수 / 検索結果を画面に動的に表示する関数
function displayResults(shops, currentPage, totalResults) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (!resultsContainer) {
        console.error('resultsContainer要素が見つかりません'); // resultsContainer要素が見つかりません
        return;
    }
    resultsContainer.innerHTML = ''; // 기존 결과 초기화 / 既存の結果を初期化

    if (!shops || shops.length === 0) {
        resultsContainer.innerHTML = `
            <p class="text-[#6B6B6B]">検索結果がありません。검색 조건을 변경하거나 다른 위치로 검색해 보세요.</p>
        `;
        return;
    }

    const resultsPerPage = 10; // 페이지당 결과 수 / 1ページあたりの結果数

    // 검색 결과를 하나씩 화면에 표시 / 検索結果を一つずつ画面に表示
    shops.forEach((shop, index) => {
        const shopImage = shop.photo && shop.photo.pc ? shop.photo.pc.l : 'default_image.jpg'; 

        const shopElement = document.createElement('div');
        shopElement.className = 'flex items-center gap-4 bg-[#FFFFFF] px-4 py-3 result-item cursor-pointer'; // 스타일 설정 / スタイル設定

        // 이미지 비율을 고정하면서 반응형으로 크기를 조정 / 画像比率を固定しつつレスポンシブにサイズを調整
        shopElement.innerHTML = `
            <div class="w-24 h-auto bg-center bg-no-repeat bg-cover rounded-lg"
                style='background-image: url("${shopImage}"); aspect-ratio: 3 / 4;'>
            </div>
            <div class="flex flex-col justify-center w-full">
                <p class="text-black text-base font-medium leading-normal line-clamp-1">${shop.name}</p>
                <p class="text-[#6B6B6B] text-sm font-normal leading-normal line-clamp-2">アクセス: ${shop.access}</p>
            </div>
        `;
        shopElement.addEventListener('click', () => {
            openModal(shop);  // shop 데이터를 모달에 전달 / shopデータをモーダルに渡す
        });
        resultsContainer.appendChild(shopElement); // 결과 컨테이너에 추가 / 結果コンテナに追加
    });
    setupPagination(totalResults, resultsPerPage, currentPage);  // 페이지네이션 설정 / ページネーションの設定
}

// 페이지네이션 설정 함수 / ページネーション設定関数
function setupPagination(totalResults, resultsPerPage, currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) {
        console.error('paginationContainer 요소를 찾을 수 없습니다.'); // paginationContainer要素が見つかりません
        return;
    }
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const pageGroupSize = 10; // 한 번에 보여줄 페이지 번호 수 / 一度に表示するページ番号数
    const pageGroupStart = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
    const pageGroupEnd = Math.min(pageGroupStart + pageGroupSize - 1, totalPages);

    if (currentPage > 1 && pageGroupStart > 1) {
        const firstPageButton = document.createElement('a');
        firstPageButton.className = 'flex size-10 items-center justify-center mx-1';
        firstPageButton.href = updateUrlParameter('page', 1);
        firstPageButton.innerHTML = '&laquo;';
        paginationContainer.appendChild(firstPageButton);
    }

    if (pageGroupStart > 1) {
        const prevGroupButton = document.createElement('a');
        prevGroupButton.className = 'flex size-10 items-center justify-center mx-1';
        prevGroupButton.href = updateUrlParameter('page', pageGroupStart - pageGroupSize);
        prevGroupButton.innerHTML = '&lsaquo;';
        paginationContainer.appendChild(prevGroupButton);
    }

    for (let i = pageGroupStart; i <= pageGroupEnd; i++) {
        const pageElement = document.createElement('a');
        pageElement.className = `text-sm font-normal leading-normal flex size-10 items-center justify-center text-black rounded-full mx-1 ${i === currentPage ? 'font-bold bg-[#EEEEEE]' : ''}`;
        pageElement.href = updateUrlParameter('page', i);
        pageElement.textContent = i;
        paginationContainer.appendChild(pageElement);
    }

    if (pageGroupEnd < totalPages) {
        const nextGroupButton = document.createElement('a');
        nextGroupButton.className = 'flex size-10 items-center justify-center mx-1';
        nextGroupButton.href = updateUrlParameter('page', pageGroupStart + pageGroupSize);
        nextGroupButton.innerHTML = '&rsaquo;';
        paginationContainer.appendChild(nextGroupButton);
    }

    if (currentPage < totalPages && pageGroupEnd < totalPages) {
        const lastPageButton = document.createElement('a');
        lastPageButton.className = 'flex size-10 items-center justify-center mx-1';
        lastPageButton.href = updateUrlParameter('page', totalPages);
        lastPageButton.innerHTML = '&raquo;';
        paginationContainer.appendChild(lastPageButton);
    }
}

// URL의 페이지 파라미터를 업데이트하는 함수 / URLのページパラメータを更新する関数
function updateUrlParameter(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    return url.toString();
}

// 결과 페이지에서 장르, 검색 반경, 정렬 기준 반영 / 結果ページでジャンル、検索範囲、ソート基準を反映
function updateSearch() {
    const radius = document.getElementById('radiusSelect').value;
    const sortOrder = document.getElementById('sortOrderSelect').value;
    const genre = document.getElementById('genreSelect').value;

    const params = new URLSearchParams(window.location.search);
    params.set('radius', radius);
    params.set('order', sortOrder);
    params.set('genre', genre);
    params.set('page', 1);

    window.location.search = params.toString();
}

// =============== 모달창에서 사용하는 부분 / モーダルウィンドウで使用する部分 =================

let directionsService; // Google Maps API의 경로 계산 / Google Maps APIでルートを計算する
let directionsRenderer; // 계산된 경로 표시 / 計算されたルートを表示する
let userMarker = null; // 사용자 마커 변수 / ユーザーマーカー変数
let restaurantMarker = null; // 레스토랑 마커 변수 / レストランマーカー変数
let validUserLat = null; // 사용자 위도 / ユーザー緯度
let validUserLng = null; // 사용자 경도 / ユーザー経度
let restaurantLat = null; // 식당 위도 / レストラン緯度
let restaurantLng = null; // 식당 경도 / レストラン経度
let isModalOpen = false; // 모달이 열려 있는지 추적하는 변수 / モーダルが開いているかを追跡する変数
let map; // 지도 객체를 전역으로 선언하여 모달이 열릴 때만 초기화 / 地図オブジェクトをグローバルに宣言し、モーダルが開かれたときのみ初期化
let restaurant; // 전역 변수로 선언 / グローバル変数として宣言

let isGooglePlacesLoaded = false; // Google Places API가 로드되었는지 확인하는 변수
let isGoogleMapsLoaded = false; // Google Maps API가 로드되었는지 확인하는 변수

// 서버에서 Google Maps API 키를 가져오는 함수
async function fetchGoogleMapsApiKey() {
    try {
        const response = await fetch('/api/google-maps-key');
        const data = await response.json();
        return data.key;
    } catch (error) {
        throw new Error('Google Maps API 키를 가져오는 중 오류 발생: ' + error.message);
    }
}

// Google Places API만 로드하는 함수 (index.html에서 사용)
async function loadGooglePlacesApi() {
    try {
        const googleMapsApiKey = await fetchGoogleMapsApiKey(); // 서버에서 API 키를 가져옴
        return new Promise((resolve, reject) => {
            if (!isGooglePlacesLoaded) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&loading=async&libraries=places&callback=initAutocomplete`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    isGooglePlacesLoaded = true;
                    resolve();
                };

                script.onerror = (error) => {
                    reject(new Error('Google Places API 로드 중 오류 발생: ' + error.message));
                };

                document.head.appendChild(script);
            } else {
                resolve();
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

// Google Places API가 성공적으로 로드된 후 실행될 콜백 함수
function onGooglePlacesLoad() {
    isGooglePlacesLoaded = true; // Places API가 로드되었음을 표시

    // initAutocomplete 함수가 있다면 호출
    if (typeof initAutocomplete === 'function') {
        initAutocomplete(); 
    }
}

// Google Maps API를 로드하는 함수 (result.html에서 사용)
async function loadGoogleMapsApi() {
    try {
        const googleMapsApiKey = await fetchGoogleMapsApiKey(); // 서버에서 API 키를 가져옴
        return new Promise((resolve, reject) => {
            if (!isGoogleMapsLoaded) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=onGoogleMapsLoad&loading=async`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    isGoogleMapsLoaded = true;
                    resolve();
                };

                script.onerror = (error) => {
                    reject(new Error('Google Maps API 로드 중 오류 발생: ' + error.message));
                };

                document.head.appendChild(script);
            } else {
                resolve();
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

// Google Maps API가 성공적으로 로드된 후 실행될 콜백 함수
function onGoogleMapsLoad() {
    isGoogleMapsLoaded = true; // Google Maps가 성공적으로 로드되면 true로 설정

    // initMap 호출: 지도 초기화 작업을 진행
    if (typeof initMap === 'function') {
        initMap(); 
    }
}


// 모달을 여는 함수 / モーダルを開く関数
async function openModal(restaurant) {
    if (isModalOpen) return;
    isModalOpen = true;

    // 레스토랑 좌표 설정 / レストランの座標設定
    restaurantLat = parseFloat(restaurant?.lat) || 35.6895; // 레스토랑 위도 / レストランの緯度
    restaurantLng = parseFloat(restaurant?.lng) || 139.6917; // 레스토랑 경도 / レストランの経度

    const latitude = restaurantLat; // 레스토랑 위도 / レストランの緯度
    const longitude = restaurantLng; // 레스토랑 경도 / レストランの経度
    // URL에서 사용자의 위도와 경도 값을 가져오기 / URLからユーザーの緯度と経度の値を取得
    const params = new URLSearchParams(window.location.search);
    const userLat = parseFloat(params.get('lat')) || null;
    const userLng = parseFloat(params.get('lng')) || null;

    try {
        // Google Maps API를 로드하고, 지도를 초기화 / Google Maps APIをロードして地図を初期化
        await loadGoogleMapsApi();
        if (typeof google !== 'undefined') {
            initMap(latitude, longitude, userLat, userLng);  // 사용자의 위도와 경도를 전달 / ユーザーの緯度と経度を渡す
            google.maps.event.trigger(map, 'resize');
            map.setCenter({ lat: latitude, lng: longitude });
        }
    } catch (error) {
        alert('Google Maps 로드 중 문제가 발생했습니다.'); // Google Maps 로드 중 문제 발생 / Google Mapsのロード中に問題が発生しました。
    }

    // 모달 내의 식당 정보 업데이트 / モーダル内のレストラン情報を更新
    document.getElementById('modalTitle').textContent = restaurant?.name || '名前なし'; // 이름 없음 / 名前なし
    document.getElementById('modalAddress').textContent = restaurant?.address || '住所なし'; // 주소 없음 / 住所なし
    document.getElementById('modalDescription').textContent = restaurant?.genre?.catch || '説明なし'; // 설명 없음 / 説明なし
    document.getElementById('modalOverview').textContent = restaurant?.catch || '情報なし'; // 정보 없음 / 情報なし
    document.getElementById('modalCuisine').textContent = restaurant?.genre?.name || 'ジャンル情報なし'; // 장르 정보 없음 / ジャンル情報なし
    document.getElementById('modalHours').textContent = restaurant?.open || '営業時間情報なし'; // 영업시간 정보 없음 / 営業時間情報なし
    document.getElementById('modalPrice').textContent = restaurant?.budget?.average || '情報なし'; // 정보 없음 / 情報なし
    document.getElementById('modalWifi').textContent = restaurant?.wifi || 'Wi-Fi 情報なし'; // WiFi 정보 없음 / WiFi情報なし
    document.getElementById('modalParking').textContent = restaurant?.parking || '駐車場情報なし'; // 주차 정보 없음 / 駐車場情報なし
    document.getElementById('modalCard').textContent = restaurant?.card || 'カード利用情報なし'; // 카드 사용 정보 없음 / カード利用情報なし

    // 추가 정보 업데이트 / 追加情報を更新
    document.getElementById('modalPrivateRoom').textContent = restaurant?.private_room || '個室情報なし'; // 개인실 정보 없음 / 個室情報なし
    document.getElementById('modalCourse').textContent = restaurant?.course || 'コース情報なし'; // 코스 정보 없음 / コース情報なし
    document.getElementById('modalLunch').textContent = restaurant?.lunch || 'ランチ情報なし'; // 점심 정보 없음 / ランチ情報なし
    document.getElementById('modalMidnight').textContent = restaurant?.midnight || '深夜営業情報なし'; // midnight 영업 정보 없음 / 深夜営業情報なし
    document.getElementById('modalCharter').textContent = restaurant?.charter || '貸切情報なし'; // charter 가능 정보 없음 / 貸切情報なし

    // 예약 URL 업데이트 / 予約URLを更新
    const reserveButton = document.getElementById('reserveButton');
    const reservationUrl = restaurant?.urls?.pc || restaurant?.urls?.mobile;
    if (reservationUrl) {
        reserveButton.onclick = () => window.open(reservationUrl, '_blank');
        reserveButton.classList.remove('hidden'); // 예약 가능하면 버튼 활성화 / 予約可能な場合ボタンを有効化
    } else {
        reserveButton.onclick = null;
        reserveButton.classList.add('hidden'); // 예약 링크가 없으면 버튼 숨김 / 予約リンクがない場合はボタンを非表示
    }

    // 쿠폰 정보 버튼으로 업데이트 / クーポン情報ボタンを更新
    const couponButton = document.getElementById('couponButton');
    const couponUrls = restaurant?.coupon_urls;
    if (couponUrls?.pc || couponUrls?.mobile) {
        couponButton.onclick = () => {
            const pcCoupon = couponUrls.pc ? couponUrls.pc : couponUrls.mobile;
            window.open(pcCoupon, '_blank');
        };
        couponButton.classList.remove('hidden'); // 쿠폰이 있으면 버튼 활성화 / クーポンがある場合ボタンを有効化
    } else {
        couponButton.onclick = null;
        couponButton.classList.add('hidden'); // 쿠폰이 없으면 버튼 숨김 / クーポンがない場合はボタンを非表示
    }

    // 모달 이미지 설정 / モーダル画像の設定
    const modalImage = document.getElementById('modalImage');
    if (restaurant?.photo?.pc?.l) {
        modalImage.innerHTML = `<img src="${restaurant.photo.pc.l}" alt="Restaurant Image" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
        modalImage.innerHTML = '<p>No image available</p>'; // 이미지 없음 / 画像なし
    }

    // 모달 열 때 스크롤을 맨 위로 이동 / モーダルを開くときにスクロールを一番上に移動
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
        setTimeout(() => {
            modalContent.scrollTop = 0; // 스크롤을 맨 위로 이동 / スクロールを一番上に移動
        }, 0);
    }

    // 길안내 버튼 추가 / 道案内ボタンの追加
    const navigateButton = document.getElementById('navigateButton');
    if (navigateButton) {
        navigateButton.onclick = () => {
            openGoogleMapsNavigation(userLat, userLng, restaurantLat, restaurantLng);
        };
    }
    // 모달을 열기 / モーダルを開く
    document.getElementById('restaurantModal').classList.remove('hidden');
}

// 모달을 닫는 함수 / モーダルを閉じる関数
function closeModal() {
    const modal = document.getElementById('restaurantModal');
    if (modal) {
        modal.classList.add('hidden');
        isModalOpen = false; // 모달 상태 리셋 / モーダルの状態をリセット
    }
}

// 모달 외부를 클릭하면 모달을 닫는 기능 / モーダル外をクリックするとモーダルを閉じる機能
window.addEventListener('click', function(event) {
    const modal = document.getElementById('restaurantModal');
    if (event.target === modal) {
        closeModal(); // 모달 외부 클릭 시 모달 닫기 / モーダル外をクリックした場合モーダルを閉じる
    }
});

// ESC 키로 모달 닫기 / ESCキーでモーダルを閉じる
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal(); // ESC 키를 누르면 모달 닫기 / ESCキーでモーダルを閉じる
    }
});

// 모달 닫기 버튼 클릭 시 모달을 닫도록 이벤트 리스너 추가 / モーダル閉じるボタンがクリックされたらモーダルを閉じる
const closeModalButton = document.getElementById('closeModal');
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// 지도를 초기화, 경로를 표시 함수 / 地図を初期化し、ルートを表示する関数
function initMap(lat, lng, userLat, userLng) {
    // 위도, 경도를 확인하고 유효하지 않은 경우 기본 도쿄 좌표 사용 / 緯度と経度を確認し、有効でない場合はデフォルトの東京の座標を使用
    const validLat = !isNaN(lat) ? lat : 35.6895;  // 레스토랑 위도 / レストランの緯度
    const validLng = !isNaN(lng) ? lng : 139.6917; // 레스토랑 경도 / レストランの経度
    validUserLat = !isNaN(userLat) ? userLat : null;  // 사용자 위도 / ユーザーの緯度
    validUserLng = !isNaN(userLng) ? userLng : null;  // 사용자 경도 / ユーザーの経度

    // 지도 초기화 / 地図を初期化
    map = new google.maps.Map(document.getElementById('modalMap'), {
        center: { lat: validLat, lng: validLng },
        zoom: 15,
    });

    // 사용자 마커 아이콘 설정 (파란색 원형 마커) / ユーザーマーカーアイコンの設定 (青色の円形マーカー)
    const userIcon = {
        path: google.maps.SymbolPath.CIRCLE, // 원형 마커 / 円形マーカー
        scale: 8, // 크기 / サイズ
        fillColor: '#4285F4', // 파란색 / 青色
        fillOpacity: 1, // 불투명도 / 不透明度
        strokeColor: '#ffffff', // 테두리 색 / 枠の色
        strokeWeight: 2, // 테두리 두께 / 枠の太さ
    };

    // 레스토랑 마커 추가 (구글 기본 마커) / レストランマーカーを追加 (Googleのデフォルトマーカー)
    if (restaurantMarker) {
        restaurantMarker.setMap(null); // 기존 마커 제거 / 既存のマーカーを削除
    }
    restaurantMarker = new google.maps.Marker({
        position: { lat: validLat, lng: validLng },
        map: map,
        title: '레스토랑 위치', // 마커 제목 설정 / マーカーのタイトル設定
    });

    // Directions Service와 Renderer 초기화 / Directions ServiceとRendererの初期化
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true, // 기본 A, B 마커를 숨김 / デフォルトのA、Bマーカーを非表示
    });
    directionsRenderer.setMap(map);

    // 사용자 위치가 있을 때 "현재 위치" 마커 추가 / ユーザーの位置がある場合に"現在位置"マーカーを追加
    if (validUserLat && validUserLng) {
        // 사용자 마커가 이미 있는지 확인 후 추가 / ユーザーマーカーが既にあるか確認して追加
        if (userMarker) {
            userMarker.setMap(null); // 기존 마커 제거 / 既存のマーカーを削除
        }
        userMarker = new google.maps.Marker({
            position: { lat: validUserLat, lng: validUserLng },
            map: map,
            icon: userIcon, // 사용자 아이콘 사용 / ユーザーアイコンを使用
            title: '현재 위치', // 현재 위치 / 現在位置
        });

        // 경로 계산 / ルート計算
        calculateAndDisplayRoute(validUserLat, validUserLng, validLat, validLng);
    }
}

// 경로 계산 함수 / ルート計算関数
function calculateAndDisplayRoute(userLat, userLng, destLat, destLng) {
    const request = {
        origin: { lat: userLat, lng: userLng },
        destination: { lat: destLat, lng: destLng },
        travelMode: google.maps.TravelMode.WALKING, // 걷기 모드로 설정 / 徒歩モードに設定
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            // 경로 정보 추출 / ルート情報を抽出
            const route = result.routes[0]; // 첫 번째 경로 선택 / 最初のルートを選択
            const distance = route.legs[0].distance.text; // 거리 / 距離
            const duration = route.legs[0].duration.value; // 소요 시간 (초 단위) / 所要時間 (秒単位)

            // 소요 시간을 분 단위로 변환 / 所要時間を分単位に変換
            const durationMin = Math.floor(duration / 60); // 분 단위로 변환 / 分単位に変換

            // HTML에 거리와 시간 업데이트 / HTMLに距離と時間を更新
            document.getElementById('routeInfoText').innerText = `${distance}, ${durationMin} min`;
        } else {
            console.error('경로 계산 실패: ' + status); // 경로 계산 실패 / ルート計算失敗
        }
    });
}

// 검색 결과의 각 항목에 클릭 이벤트 추가 / 検索結果の各項目にクリックイベントを追加
function addClickEventToResults(restaurantData) {
    const resultElements = document.querySelectorAll('.result-item');
    
    resultElements.forEach((resultElement, index) => {
        resultElement.addEventListener('click', () => {
            openModal(restaurantData[index]); // 해당 식당 정보로 모달 열기 / 該当のレストラン情報でモーダルを開く
        });
    });
}

// 경로 안내 기능 / ルート案内機能
function openGoogleMapsNavigation(userLat, userLng, destLat, destLng) {
    // 구글 지도 경로 안내 URL 생성 / Googleマップのルート案内URLを生成
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=walking`;

    // 새 창 또는 현재 창에서 구글 맵 열기 / 新しいウィンドウまたは現在のウィンドウでGoogleマップを開く
    window.open(googleMapsUrl, '_blank');
}

// 상세 정보를 표시하는 모달 기능 / 詳細情報を表示するモーダル機能
function displayRestaurants(restaurants) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화 / 既存の結果を初期化

    restaurants.forEach(restaurant => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item p-4 hover:bg-gray-200 transition-colors duration-200 cursor-pointer'; // 클래스 추가 / クラスを追加
        resultItem.innerHTML = `<p>${restaurant.name}</p>`; // 식당 이름 / レストランの名前

        // 마우스 클릭 시 모달 열기 등의 이벤트 추가 / マウスクリック時にモーダルを開くなどのイベントを追加
        resultItem.addEventListener('click', () => {
            openModal(restaurant); // 모달 열기 함수 호출 / モーダルを開く関数を呼び出す
        });

        resultsContainer.appendChild(resultItem);
    });
}
