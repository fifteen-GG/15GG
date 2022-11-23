# 15GG Frontend

## Git Commit Message 규칙

```
1. 제목과 본문을 빈 행으로 구분합니다.
2. 제목을 50글자 이내로 제한합니다.
3. 제목의 첫 글자는 대문자로 작성합니다.
4. 제목의 끝에는 마침표를 넣지 않습니다.
5. 제목은 명령문으로! 과거형을 사용하지 않습니다.
6. 본문의 각 행은 72글자 내로 제한합니다.
7. 어떻게 보다는 무엇과 왜를 설명합니다.
```

# Git Commit Message 구조

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)
design: 사용자 UI 디자인 변경 (CSS 등)
test: 테스트 코드, 리팩토링 (Test Code)
refactor: 리팩토링 (Production Code)
build: 빌드 파일 수정
ci: CI 설정 파일 수정
perf: 성능 개선
chore: 자잘한 수정이나 빌드 업데이트
rename: 파일 혹은 폴더명을 수정만 한 경우
remove: 파일을 삭제만 한 경우
```

# 프로젝트 init 정리

```
1. 제플린 기준 1번 페이지를 제외한 다른 페이지들은 헤더가 있으므로 SubPage 컴포넌트를 공유하고 props로 구분하여 renderContent 함수에서 다른 content를 렌더링한다.
2. SubPage 컴포넌트의 SubPageHeader와 SubPageContent는 651px 이상일 때 배경을 보여주는 역할 그 이상도 이하도 아니고 모든 내용은 SubPageResponsiveHeader,
   SubPageContentResponsive에 들어간다.
3. 라우팅 주소나 컴포넌트 이름은 당연히 임의로 작성한 거니깐 기능에 따라 이쁘게 나누기!
4. 디렉토리 구조도 참고해서 style, props, index 따로 정리하면서 가독성 좋게 작성하기!
```
