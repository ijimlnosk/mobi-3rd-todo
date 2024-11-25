import styled from "styled-components";
import Box from "../components/common/box";
import { colors } from "../constants/design-token/color";
import Spacer from "../components/common/spacer";
import spacing from "../constants/design-token/spacing";
import Clock from "../components/todo/clock";
import TodoItem from "../components/todo/todoItem";
import { useState } from "react";
import { getTodo } from "../libs/axios/todo";
import UpdateModal from "../components/todo/updateModal";
import { useDispatch, useSelector } from "react-redux";
import { openAddModal, openUpdateModal } from "../libs/redux/slice/modalSlice";
import Button from "../components/common/button";
import AddTodoModal from "../components/todo/addTodoModal";
import { formattedDate } from "../utils/\bformattedDate";
import { useQuery } from "react-query";
import { AutoDeleteTodos } from "../utils/autoDeleteTodos";

const Todo = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // 자동 삭제 함수 실행
    AutoDeleteTodos();

    // useQuery를 사용하여 todo list 가져오기
    const {
        data: todoResponse, // 반환된 데이터를 todoResponse에 저장
        isLoading, // 데이터를 불러오는 동안 true로 설정 로딩 상태를 보여줌
        isError, // 에러 발생시 true로 설정
        error, // isError가 true일 때, 에러의 상세 정보를 포함
    } = useQuery(
        ["todos", currentPage], // 쿼리 키
        () => getTodo({ page: currentPage }),
        {
            staleTime: 5 * 60 * 1000, // 데이터 5분간 유지
        }
    );

    // 현재 날짜를 포맷해서 가져오기
    const currentDate = formattedDate(new Date());

    // 오늘 날짜에 맞는 todo만 필터링하여 배열로 생성
    const todos = todoResponse
        ? Object.values(todoResponse).filter(
              (item) =>
                  typeof item === "object" && // 객체 타입인지 확인
                  item.idx && // 유효한 idx가 있는지 확인
                  formattedDate(item.createdAt) === currentDate // createdAt이 오늘 날짜와 일치하는지 확인
          )
        : [];

    // 선택된 todo ID 상태
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    // 전체 페이지 수 가져오기
    const totalPages = todoResponse?.pagination?.totalPage || 1;

    // modal 상태 가져오기
    const dispatch = useDispatch();
    const isUpdateModalOpen = useSelector(
        (state) => state.modal.isUpdateModalOpen
    );
    const isAddModalOpen = useSelector((state) => state.modal.isAddModalOpen);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddClick = () => {
        dispatch(openAddModal());
    };

    const handleEditClick = (todoId) => {
        setSelectedTodoId(todoId);
        dispatch(openUpdateModal());
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <Container>
            <Box backgroundColor={colors.PINK.softPink}>
                <h1>{currentDate}</h1>
                <Spacer width={spacing.small} height={spacing.small} />
                <Clock />
                <Spacer height={spacing.xlarge} />
                <Button
                    theme={"blossomTheme"}
                    size={"small"}
                    onClick={() => handleAddClick()}
                >
                    추가하기
                </Button>
                <Spacer height={spacing.xlarge} />
                <TodoList>
                    {todos?.map((data) => (
                        <TodoItemBox key={data.idx}>
                            <TodoItem
                                todoId={data.idx}
                                title={data.title}
                                content={data.content}
                                state={data.state}
                                onEdit={handleEditClick}
                            />
                        </TodoItemBox>
                    ))}
                </TodoList>
                <ButtonBox>
                    <Button
                        theme={"springTheme"}
                        size={"small"}
                        onClick={handlePrevPage}
                    >
                        prev
                    </Button>
                    <Button
                        theme={"springTheme"}
                        size={"small"}
                        onClick={handleNextPage}
                    >
                        next
                    </Button>
                </ButtonBox>
            </Box>
            {isUpdateModalOpen && <UpdateModal todoId={selectedTodoId} />}

            {isAddModalOpen && <AddTodoModal />}
        </Container>
    );
};
export default Todo;

const Container = styled.div`
    padding: 80px 0;
    background-color: ${colors.PINK.softPink};
`;

const TodoList = styled.div`
    width: 500px;
    height: 500px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
    background-color: ${colors.PINK.cherryBlossom};
    border-radius: 8px;
`;

const TodoItemBox = styled.div`
    padding-bottom: 20px;
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
