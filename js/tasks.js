const FILTER = {
    ALL: 'all',
    CHECKED: 'checked',
    ACTIVE: 'active'
};

const OPTIONS = {
    FILTER_CLASS: 'filter',
    FILTER_ACTIVE_CLASS: 'is-active',
};

const MOCK_DATA = [
    {
        id: "1",
        title: 'Задача 1',
        completed: false,
    },
    {
        id: "2",
        title: 'Задача 2',
        completed: true,
    },
    {
        id: "3",
        title: 'Задача 3',
        completed: false,
    },
];

class Tasks {
    constructor(list) {
        this.list = list
    };

    getList(filter = FILTER.ALL) {
        return this.filter(filter);
    }

    getTask(id) {
        return this.list.filter(task => task.id === id);
    }

    fetchTasks(list) {
        this.list = list;
    }

    addTask(task) {
        this.list = [...this.list, task];
    }

    removeTask(id) {
        this.list = this.list.filter(task => task.id !== id);
    }

    changeStatus(id) {
        this.list = this.list.map(task => task.id !== id ? task : { ...task, completed: !task.completed });
    }

    filter(filter) {
        return this.list.filter(task => {
            if (filter === FILTER.ALL) {
                return true;
            }
            if (filter === FILTER.ACTIVE) {
                return !task.completed;
            }
            if (filter === FILTER.CHECKED) {
                return task.completed;
            }
        });
    }
}

const storage = new Tasks([]);

initApp();

async function initApp() {
    await getTasks();
    renderTasks();
    addTask();
    filter();
}

/*
    Получает список задач
*/

function getTasks() {
    setLoader(true);
    return new Promise((resolve) => {
        setTimeout(() => {
            storage.fetchTasks(MOCK_DATA);
            resolve(true);
            setLoader(false);
        }, 1000);
    });
}

/*
    Рендерит задачи
*/

function renderTasks() {
    const tasks = storage.getList(getCurrentFilter());
    const html = tasks.map(task => createTask(task)).join('');
    const $list = document.querySelector('.task-list');
    $list.innerHTML = html;

    const $tasks = $list.querySelectorAll('.task');
    $tasks.forEach($task => initTask($task));
}

/*
    Вешает обработчики
    на события (завершить, удалить) на элемент задачи
*/

function initTask($task) {
    const id = $task.getAttribute('data-id');
    const $statusBtn = $task.querySelector('.task-status');
    const $title = $task.querySelector('.task-title');
    const $removeBtn = $task.querySelector('.button-remove');

    const changeStatus = () => {
        storage.changeStatus(id);
        renderTasks();
    }

    const remove = () => {
        storage.removeTask(id);
        renderTasks();
    };

    $statusBtn.addEventListener('click', changeStatus);
    $title.addEventListener('click', changeStatus);
    $removeBtn.addEventListener('click', remove);
}

/*
    Создает html разметку задачи
*/

function createTask({ id, title, completed }) {
    return `
    <div class="task ${completed ? 'is-checked' : ''}" data-id="${id}">
        <div class="task-status ${completed ? 'checked' : ''}">
            <svg width="18" height="18">
                <use href="#check" fill="#007fa2"></use>
            </svg>
        </div>
        
        <span class="task-title">${title}</span>
        
        <button class="button-remove button">
            <svg width="18" height="18">
                <use href="#remove" fill="#007fa2"></use>
            </svg>
        </button>
    </div>`;
}

/*
    Добавляет новую задачу
*/

function addTask() {
    const $addFrom = document.querySelector('.add-task');

    const addTaskHandler = (evt) => {
        evt.preventDefault();
        const $input = document.querySelector('input[name="task"]');
        const errorClass = 'error';

        if (!$input.value.trim()) {
            $input.classList.add(errorClass);
            return false;
        } else {
            $input.classList.remove(errorClass);
        }

        storage.addTask({
            id: Date.now().toString(),
            title: $input.value,
            completed: false,
        });

        $input.value = '';
        renderTasks();
    };

    $addFrom.addEventListener('submit', addTaskHandler);
}

/*
    Фильтр
*/

function filter() {
    const $filter = document.querySelector(`.${OPTIONS.FILTER_CLASS}`);

    const filterHandler = (evt) => {
        const filter = evt.target.getAttribute('data-filter');
        if (!filter || filter === getCurrentFilter()) return false;
        switchFilter(filter);
        renderTasks();
    };

    $filter.addEventListener('click', filterHandler);
}

/*
    Переключает фильтр
*/

function switchFilter(newfilterName) {
    const $currentButton = document.querySelector(`.${OPTIONS.FILTER_CLASS} .${OPTIONS.FILTER_ACTIVE_CLASS}`);
    $currentButton.classList.remove(OPTIONS.FILTER_ACTIVE_CLASS);

    const $newFilterButton = document.querySelector(`.${OPTIONS.FILTER_CLASS} button[data-filter="${newfilterName}"]`);
    $newFilterButton.classList.add(OPTIONS.FILTER_ACTIVE_CLASS);
}

/*
    Получает активный фильтр
*/

function getCurrentFilter() {
    return document.querySelector(`.${OPTIONS.FILTER_CLASS} .${OPTIONS.FILTER_ACTIVE_CLASS}`).getAttribute('data-filter');
}

/*
    Устанавливает лоадер
*/

function setLoader(status) {
    const loader = document.querySelector('.loader');
    status
        ? loader.classList.add('loading')
        : loader.classList.remove('loading');
}