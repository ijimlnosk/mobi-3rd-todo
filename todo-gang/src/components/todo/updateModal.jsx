import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeUpdateModal } from "../../libs/redux/slice/modalSlice";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import Button from "../common/button";
import Input from "../common/input";
import Spacer from "../common/spacer";
import spacing from "../../constants/design-token/spacing";
import TextArea from "../common/textarea";
import { colors } from "../../constants/design-token/color";
import { patchTodo } from "../../libs/axios/todo";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../../schemas/todo-schema";
import { useMutation, useQueryClient } from "react-query";

// 모달이 렌더링되는 애플리케이션의 루트 엘리먼트 설정
Modal.setAppElement("#root");

const UpdateModal = ({ todoId }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const isUpdateModalOpen = useSelector(
        (state) => state.modal.isUpdateModalOpen
    );
    // todo를 업데이트하는 뮤테이션 정의
    const updateTodoMutation = useMutation(patchTodo, {
        onMutate: async (newTodo) => {
            // 새 데이터로 쿼리 데이터를 최신화하기 전에 현재 쿼리 취소
            await queryClient.cancelMutations("todos");

            // 이전 todo data를 가져옴.
            const prevTodos = queryClient.getQueryData("todos");

            // 이전 todo data를 변경
            // 캐시된 todos 쿼리 데이터를 업데이트 하는 로직
            queryClient.setQueryData("todos", (oldTodo) => {
                // oldTodo가 유효한지 확인
                if (!oldTodo || !oldTodo.data) {
                    return; // 또는 기본값 설정
                }

                // 기존의 oldTodo 를 복사
                return {
                    ...oldTodo,
                    // data 배열 내의 특정 todo 객체를 새 데이터로 업데이트
                    data: oldTodo.data.map((todo) =>
                        // 만약 현재 반복 중인 todo의 idx가 수정할 todo의 ID와 일치하면
                        // todo 객체를 새로운 데이터로 업데이트
                        todo.idx === todoId ? { ...todo, ...newTodo } : todo
                    ),
                };
            });
            // 이전 데이터 백업
            // 에러 발생 시 원래 상태로 롤백
            return { prevTodos };
        },

        // mutation 성공 시 쿼리 무효화하고 최신 데이터 불러옴.
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            closeModal();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const onSubmit = (data) => {
        updateTodoMutation.mutate({
            todoId: todoId,
            title: data.title,
            content: data.content,
            state: data.state,
        });
    };

    // 모달 닫기
    const closeModal = () => {
        dispatch(closeUpdateModal());
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onchange", resolver: yupResolver(todoSchema) });

    return (
        <Modal
            isOpen={isUpdateModalOpen}
            onRequestClose={closeModal}
            contentLabel="할 일 수정"
            style={{
                content: {
                    width: "300px",
                    height: "350px",
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `${colors.LAVENDER.lightLavender}`,
                },
                overlay: {
                    backgroundColor: `rgba(0,0,0,0.4)`,
                },
            }}
        >
            <ModalWrpper>
                <TitleBox>
                    <h2>할 일 수정</h2>
                </TitleBox>
                <CloseBox>
                    <Button
                        onClick={closeModal}
                        theme={"morningDewTheme"}
                        size={"xbtn"}
                    >
                        <BsXLg />
                    </Button>
                </CloseBox>
            </ModalWrpper>
            <Spacer height={spacing.small} />
            <TextForm onSubmit={handleSubmit(onSubmit)}>
                <Input
                    theme={"blossomTheme"}
                    register={register}
                    registerKey="title"
                    title="제목"
                    errors={errors}
                />
                <Spacer height={spacing.small} />
                <TextArea
                    theme={"blossomTheme"}
                    register={register}
                    registerKey="content"
                    title="내용"
                    errors={errors}
                    size={"medium"}
                />
                <Spacer height={spacing.medium} />
                <Button theme={"blossomTheme"} size={"small"} type={"submit"}>
                    완료
                </Button>
            </TextForm>
        </Modal>
    );
};
export default UpdateModal;

const ModalWrpper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
`;

const TitleBox = styled.div`
    width: 190px;
    display: flex;
    justify-content: end;
    align-items: center;
`;

const CloseBox = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

const TextForm = styled.form`
    width: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
