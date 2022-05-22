import create from 'zustand';

export const useCookiesStore = create((set, get) => ({
    cookies: [
        { color: '#f2cd5d', id: 'simple',    count: 0, prev_id: ''       },
        { color: '#a9fbd7', id: 'rare',      count: 0, prev_id: 'simple' },
        { color: '#648de5', id: 'epic',      count: 0, prev_id: 'rare'   },
        { color: '#e5beed', id: 'legendary', count: 0, prev_id: 'epic'   }
    ],

    addCookie: (id) => {
        const { cookies } = get();

        const prev_id = cookies.find(cookie => cookie.id === id).prev_id;
        const is_possible = !prev_id || cookies.find(cookie => cookie.id === prev_id).count >= 10;

        if (is_possible) {
            set({
                cookies: cookies.map(cookie => ({
                    ...cookie,
                    count: cookie.id === id 
                        ? cookie.count + 1
                        : cookie.id === prev_id
                            ? cookie.count - 10 
                            : cookie.count
                }))
            });
        }
    }
}));
