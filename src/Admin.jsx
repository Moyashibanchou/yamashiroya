import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Edit2, Trash2, Save, X, Image as ImageIcon, 
    Package, Search, Loader2, AlertCircle, ChevronLeft, ChevronDown, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './apiConfig';

export default function Admin() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const STYLE_OPTIONS = [
        { label: 'アレンジメント', value: 'arrangement' },
        { label: '花束（ブーケ）', value: 'bouquet' },
        { label: '胡蝶蘭', value: 'orchid' },
        { label: '観葉植物', value: 'plant' },
        { label: 'プリザーブド', value: 'preserved' },
    ];

    const COLOR_OPTIONS = [
        { label: '赤系', value: 'red' },
        { label: 'ピンク系', value: 'pink' },
        { label: '白系', value: 'white' },
        { label: '黄・オレンジ系', value: 'yellow_orange' },
        { label: 'ブルー・パープル系', value: 'blue_purple' },
        { label: 'その他・おまかせ', value: 'other' },
    ];

    const PURPOSE_OPTIONS = [
        { label: 'お祝い', value: 'celebration' },
        { label: 'お供え・お悔やみ', value: 'condolence' },
        { label: '誕生日・記念日', value: 'birthday' },
        { label: 'お見舞い', value: 'visit' },
        { label: '自宅用', value: 'home' },
    ];

    // ログインチェック
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('yamashiroya_admin_logged_in') === 'true';
        if (!isLoggedIn) {
            window.scrollTo(0, 0);
            navigate('/admin-login');
        }
    }, [navigate]);

    // ログアウト処理
    const handleLogout = () => {
        localStorage.removeItem('yamashiroya_admin_logged_in');
        navigate('/admin-login');
    };
    
    // フォームの状態
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        style: [],
        color: [],
        purpose: [],
        recommended: false
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const API_URL = `${API_BASE_URL}/api/products`;

    const resolveImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
        const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
        return `${API_BASE_URL}${path}`;
    };

    // 商品一覧の取得
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('商品データの取得に失敗しました');
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // フォーム入力ハンドラー
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const normalizeMulti = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value.filter(Boolean);
        const s = String(value);
        if (s.includes(',')) {
            return s
                .split(',')
                .map((x) => x.trim())
                .filter(Boolean);
        }
        return [s].filter(Boolean);
    };

    const toggleMultiValue = (key, value) => {
        setFormData((prev) => {
            const prevArr = Array.isArray(prev[key]) ? prev[key] : normalizeMulti(prev[key]);
            const next = prevArr.includes(value) ? prevArr.filter((v) => v !== value) : [...prevArr, value];
            return { ...prev, [key]: next };
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
        setImageFile(file);

        if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreviewUrl);
        }

        if (file) {
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setImagePreviewUrl('');
        }
    };

    // 新規登録・更新の実行
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_URL}/${editingId}` : API_URL;

        try {
            if (!isEditing && !imageFile) {
                throw new Error('画像を選択してください');
            }

            const fd = new FormData();
            if (imageFile) fd.append('image', imageFile);
            fd.append('name', formData.name);
            fd.append('price', String(parseInt(formData.price)));
            if (formData.description) fd.append('description', formData.description);

            const appendMulti = (key, values) => {
                const arr = normalizeMulti(values);
                arr.forEach((v) => fd.append(key, v));
            };
            appendMulti('style', formData.style);
            appendMulti('color', formData.color);
            appendMulti('purpose', formData.purpose);
            fd.append('recommended', String(Boolean(formData.recommended)));

            const response = await fetch(url, {
                method,
                body: fd
            });

            if (!response.ok) throw new Error('保存に失敗しました');
            
            await fetchProducts();
            resetForm();
            alert(isEditing ? '商品を更新しました' : '商品を登録しました');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 編集モードへの切り替え
    const handleEdit = (product) => {
        setIsEditing(true);
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            style: normalizeMulti(product.style),
            color: normalizeMulti(product.color),
            purpose: normalizeMulti(product.purpose),
            recommended: Boolean(product.recommended)
        });
        setImageFile(null);
        setImagePreviewUrl(product.imageUrl ? resolveImageUrl(product.imageUrl) : '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 削除の実行
    const handleDelete = async (id) => {
        if (!window.confirm('この商品を削除してもよろしいですか？')) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('削除に失敗しました');
            
            await fetchProducts();
            alert('商品を削除しました');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    // フォームのリセット
    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            style: [],
            color: [],
            purpose: [],
            recommended: false
        });

        if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        setImageFile(null);
        setImagePreviewUrl('');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen washi-pattern text-[#4a3f35] elegant-font pb-20"
        >
            <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-16">
                
                {/* ヘッダー */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-[#8a7a6c] hover:text-[#4a3f35] mb-4 transition-colors"
                        >
                            <ChevronLeft size={20} />
                            <span>ショップに戻る</span>
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] border-l-8 border-[#bc8a7e] pl-6">
                            商品管理パネル
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <button 
                            onClick={handleLogout}
                            className="bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#ebdcd0] flex items-center gap-2 hover:bg-[#2B5740] hover:text-white hover:border-[#2B5740] transition-all group"
                        >
                            <LogOut size={18} className="text-[#8a7a6c] group-hover:text-white" />
                            <span className="font-bold tracking-widest text-sm">ログアウト</span>
                        </button>
                        <div className="bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#ebdcd0] flex items-center gap-4">
                            <Package className="text-[#bc8a7e]" size={24} />
                            <span className="font-bold tracking-widest">登録件数: {products.length}件</span>
                        </div>
                    </div>
                </div>

                {/* エラー表示 */}
                {error && (
                    <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* 左側：商品一覧テーブル */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white/40 rounded-[2.5rem] border border-[#ebdcd0] overflow-hidden soft-shadow-header">
                            <div className="p-8 border-b border-[#ebdcd0] bg-white/20">
                                <h2 className="text-xl font-bold tracking-widest flex items-center gap-3">
                                    <Search size={22} className="text-[#bc8a7e]" />
                                    商品一覧
                                </h2>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#f5efe9] text-[#8a7a6c] text-xs tracking-[0.2em] uppercase">
                                        <tr>
                                            <th className="px-8 py-5">商品</th>
                                            <th className="px-8 py-5 text-right">価格</th>
                                            <th className="px-8 py-5 text-center">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#ebdcd0]">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-white/30 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white rounded-xl border border-[#ebdcd0] overflow-hidden flex-shrink-0 shadow-sm">
                                                            {product.imageUrl ? (
                                                                <img src={resolveImageUrl(product.imageUrl)} alt={product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[#ebdcd0]">
                                                                    <ImageIcon size={20} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-sm truncate mb-1">{product.name}</p>
                                                            <p className="text-[10px] text-[#8a7a6c] line-clamp-1">{product.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right font-bold text-[#2B5740]">
                                                    ¥{product.price.toLocaleString()}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleEdit(product)}
                                                            className="p-2 text-[#6e5e54] hover:bg-[#4a3f35] hover:text-white rounded-lg transition-all"
                                                            title="編集"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-2 text-[#2B5740] hover:bg-[#2B5740] hover:text-white rounded-lg transition-all"
                                                            title="削除"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && !loading && (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-20 text-center text-[#8a7a6c] tracking-widest font-medium">
                                                    登録されている商品がありません
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 右側：商品登録・編集フォーム */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 bg-white/40 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header p-8 md:p-10">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-xl font-bold tracking-widest flex items-center gap-3">
                                    {isEditing ? <Edit2 size={22} className="text-[#bc8a7e]" /> : <Plus size={22} className="text-[#bc8a7e]" />}
                                    {isEditing ? '商品情報の編集' : '新規商品の登録'}
                                </h2>
                                {isEditing && (
                                    <button onClick={resetForm} className="text-[#8a7a6c] hover:text-[#4a3f35] p-2">
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">商品名</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="例：季節のおまかせブーケ" 
                                        className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/10 focus:border-[#4a3f35] transition-all" 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">価格（税込）</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="0" 
                                            className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/10 focus:border-[#4a3f35] transition-all" 
                                        />
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#a38f7d] font-bold">¥</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">商品説明</label>
                                    <textarea 
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="商品の詳細な説明を入力してください..." 
                                        className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/10 focus:border-[#4a3f35] transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">スタイル</label>
                                    <div className="bg-white/30 border border-[#ebdcd0] rounded-2xl px-6 py-5">
                                        <div className="flex flex-wrap gap-3">
                                            {STYLE_OPTIONS.map((opt) => (
                                                <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={Array.isArray(formData.style) && formData.style.includes(opt.value)}
                                                        onChange={() => toggleMultiValue('style', opt.value)}
                                                        className="w-5 h-5 accent-[#2B5740]"
                                                    />
                                                    <span className="text-[0.9rem] font-bold tracking-widest text-[#6e5e54]">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/30 border border-[#ebdcd0] rounded-2xl px-6 py-5">
                                    <label className="flex items-center justify-between gap-4 cursor-pointer select-none">
                                        <div>
                                            <div className="text-xs font-bold text-[#8a7a6c] tracking-[0.2em] uppercase">おすすめに設定する</div>
                                            <div className="mt-2 text-[0.85rem] text-[#6e5e54] tracking-widest font-medium">トップページの「おすすめの品」に表示されます</div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="recommended"
                                            checked={Boolean(formData.recommended)}
                                            onChange={handleInputChange}
                                            className="w-6 h-6 accent-[#2B5740]"
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">カラー</label>
                                    <div className="bg-white/30 border border-[#ebdcd0] rounded-2xl px-6 py-5">
                                        <div className="flex flex-wrap gap-3">
                                            {COLOR_OPTIONS.map((opt) => (
                                                <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={Array.isArray(formData.color) && formData.color.includes(opt.value)}
                                                        onChange={() => toggleMultiValue('color', opt.value)}
                                                        className="w-5 h-5 accent-[#2B5740]"
                                                    />
                                                    <span className="text-[0.9rem] font-bold tracking-widest text-[#6e5e54]">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">ご用途</label>
                                    <div className="bg-white/30 border border-[#ebdcd0] rounded-2xl px-6 py-5">
                                        <div className="flex flex-wrap gap-3">
                                            {PURPOSE_OPTIONS.map((opt) => (
                                                <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={Array.isArray(formData.purpose) && formData.purpose.includes(opt.value)}
                                                        onChange={() => toggleMultiValue('purpose', opt.value)}
                                                        className="w-5 h-5 accent-[#2B5740]"
                                                    />
                                                    <span className="text-[0.9rem] font-bold tracking-widest text-[#6e5e54]">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">画像</label>
                                    <div className="space-y-4">
                                        <input
                                            id="product-image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />

                                        <label
                                            htmlFor="product-image"
                                            className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none transition-all flex items-center justify-between gap-4 cursor-pointer hover:bg-white/70"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-xl bg-[#f5efe9] border border-[#ebdcd0] flex items-center justify-center text-[#8a7a6c] flex-shrink-0">
                                                    <ImageIcon size={18} />
                                                </div>
                                                <span className="font-medium truncate">
                                                    {imageFile ? imageFile.name : (isEditing ? '画像を変更する（任意）' : '画像を選択してください')}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#8a7a6c] flex-shrink-0">
                                                選択
                                            </span>
                                        </label>

                                        {imagePreviewUrl ? (
                                            <div className="bg-white/50 border border-[#ebdcd0] rounded-2xl p-4">
                                                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white border border-[#ebdcd0]">
                                                    <img src={imagePreviewUrl} alt="プレビュー" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white/30 border border-[#ebdcd0] rounded-2xl p-4">
                                                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f5efe9] border border-[#ebdcd0] flex items-center justify-center text-[#a38f7d]">
                                                    <ImageIcon size={24} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 rounded-2xl bg-[#4a3f35] text-white font-bold tracking-[0.3em] shadow-xl hover:bg-[#322a23] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            {isEditing ? <Save size={20} /> : <Plus size={20} />}
                                            {isEditing ? '変更を保存する' : '商品を登録する'}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
