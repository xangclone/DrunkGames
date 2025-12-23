
import React from 'react';
import { CardType, Card, DiceRule } from './types';
export const INITIAL_CARDS: Card[] = [
  // --- SỰ THẬT (TRUTH) - 20 CÂU ---
  { id: 't1', type: CardType.TRUTH, content: "Ai trong bàn nhậu này bạn muốn 'kết nghĩa anh em' nhất?", intensity: 1 },
  { id: 't2', type: CardType.TRUTH, content: "Lần say xỉn nào khiến bạn cảm thấy hối hận nhất cho tới giờ?", intensity: 1 },
  { id: 't3', type: CardType.TRUTH, content: "Bạn đã từng 'crush' ai trong bàn này chưa?", intensity: 3 },
  { id: 't4', type: CardType.TRUTH, content: "Nếu thế giới kết thúc vào ngày mai, bạn sẽ nói gì với người ngồi bên trái?", intensity: 2 },
  { id: 't5', type: CardType.TRUTH, content: "Mối tình ngắn nhất của bạn kéo dài bao lâu?", intensity: 2 },
  { id: 't6', type: CardType.TRUTH, content: "Bạn đã từng giả vờ bận để trốn đi nhậu một mình chưa?", intensity: 1 },
  { id: 't7', type: CardType.TRUTH, content: "Số tiền lớn nhất bạn từng tiêu cho một cuộc nhậu là bao nhiêu?", intensity: 2 },
  { id: 't8', type: CardType.TRUTH, content: "Điều dối trá lớn nhất bạn từng nói với bố mẹ là gì?", intensity: 3 },
  { id: 't9', type: CardType.TRUTH, content: "Bạn thấy ai là người ăn mặc 'có gu' nhất trong bàn này?", intensity: 1 },
  { id: 't10', type: CardType.TRUTH, content: "Nếu được hoán đổi thân xác với 1 người ở đây, bạn chọn ai?", intensity: 2 },
  { id: 't11', type: CardType.TRUTH, content: "Tật xấu nào của bạn khi say khiến bạn bè 'khiếp sợ' nhất?", intensity: 2 },
  { id: 't12', type: CardType.TRUTH, content: "Bạn từng dùng ứng dụng hẹn hò chưa? Cuộc gặp tệ nhất là khi nào?", intensity: 3 },
  { id: 't13', type: CardType.TRUTH, content: "Ai là người bạn cảm thấy có thể tin tưởng nhất trong bàn?", intensity: 1 },
  { id: 't14', type: CardType.TRUTH, content: "Tên biệt danh sến súa nhất mà người yêu từng gọi bạn là gì?", intensity: 3 },
  { id: 't15', type: CardType.TRUTH, content: "Bạn đã từng bị ai đá chưa? Lý do là gì?", intensity: 3 },
  { id: 't16', type: CardType.TRUTH, content: "Bạn có bao giờ lục lỏi điện thoại của người khác chưa?", intensity: 3 },
  { id: 't17', type: CardType.TRUTH, content: "Món ăn nào bạn ghét nhất nhưng phải giả vờ ăn để lịch sự?", intensity: 1 },
  { id: 't18', type: CardType.TRUTH, content: "Bạn có hay nói mớ khi ngủ không? Bí mật nào đã bị lộ?", intensity: 2 },
  { id: 't19', type: CardType.TRUTH, content: "Nếu trúng số 10 tỷ, bạn sẽ làm gì đầu tiên?", intensity: 1 },
  { id: 't20', type: CardType.TRUTH, content: "Điều gì ở bản thân mà bạn muốn thay đổi nhất?", intensity: 2 },

  // --- THỬ THÁCH (DARE) - 20 CÂU ---
  { id: 'd1', type: CardType.DARE, content: "Cho người bên phải mượn điện thoại để đăng 1 status bất kỳ lên Facebook bạn.", intensity: 3 },
  { id: 'd2', type: CardType.DARE, content: "Gọi cho 1 người bạn và mượn 500k với lý do 'đi cấp cứu' (sau đó giải thích ngay).", intensity: 3 },
  { id: 'd3', type: CardType.DARE, content: "Biểu diễn một điệu nhảy sexy trên nền nhạc thiếu nhi.", intensity: 2 },
  { id: 'd4', type: CardType.DARE, content: "Để mọi người trong bàn mỗi người vẽ 1 nét lên mặt bạn.", intensity: 3 },
  { id: 'd5', type: CardType.DARE, content: "Đọc to 3 tin nhắn gần nhất trong Zalo của bạn.", intensity: 3 },
  { id: 'd6', type: CardType.DARE, content: "Thực hiện 20 cái chống đẩy ngay tại chỗ.", intensity: 1 },
  { id: 'd7', type: CardType.DARE, content: "Ăn một miếng đồ ăn do người đối diện gắp và đút cho bạn.", intensity: 1 },
  { id: 'd8', type: CardType.DARE, content: "Giả làm chó sủa mỗi khi có ai đó trong bàn uống rượu trong 2 lượt tới.", intensity: 2 },
  { id: 'd9', type: CardType.DARE, content: "Đứng ngoài cửa ra vào và chào mọi người đi ngang qua bằng giọng nghiêm túc.", intensity: 2 },
  { id: 'd10', type: CardType.DARE, content: "Để người bên trái tạo kiểu tóc mới cho bạn bằng kẹp tăm hoặc dây thun.", intensity: 2 },
  { id: 'd11', type: CardType.DARE, content: "Uống hết nước trong ly bằng cách dùng thìa/muỗng café.", intensity: 1 },
  { id: 'd12', type: CardType.DARE, content: "Nói chuyện bằng giọng vùng miền khác (hoặc giọng nước ngoài) trong 3 lượt chơi.", intensity: 2 },
  { id: 'd13', type: CardType.DARE, content: "Gửi ảnh selfie xấu nhất trong máy cho người yêu/crush.", intensity: 3 },
  { id: 'd14', type: CardType.DARE, content: "Thử liếm khuỷu tay của chính mình (nếu làm được mọi người uống, không được bạn uống).", intensity: 1 },
  { id: 'd15', type: CardType.DARE, content: "Kể một bí mật của người ngồi bên phải (phải được sự đồng ý hoặc uống 2 ly).", intensity: 3 },
  { id: 'd16', type: CardType.DARE, content: "Nhắm mắt và đoán xem ai đang chạm vào tay mình.", intensity: 1 },
  { id: 'd17', type: CardType.DARE, content: "Hát một bài hát của Sơn Tùng M-TP theo phong cách nhạc sến.", intensity: 2 },
  { id: 'd18', type: CardType.DARE, content: "Chụp ảnh cả bàn nhậu và tag tất cả mọi người kèm caption 'Gia đình văn hóa'.", intensity: 2 },
  { id: 'd19', type: CardType.DARE, content: "Để người đối diện kiểm tra lịch sử tìm kiếm Google của bạn.", intensity: 3 },
  { id: 'd20', type: CardType.DARE, content: "Làm động tác 'bắn tim' với một người lạ trong quán.", intensity: 3 },

  // --- NHẬU (DRINK) - 20 CÂU ---
  { id: 'c1', type: CardType.CHALLENGE, content: "Ai đang dùng điện thoại iPhone cạn ly!", intensity: 1 },
  { id: 'c2', type: CardType.CHALLENGE, content: "Người lùn nhất và người cao nhất trong bàn cạn ly.", intensity: 1 },
  { id: 'c3', type: CardType.CHALLENGE, content: "Cả bàn cùng 'Zô' 100% trừ người vừa lật thẻ.", intensity: 2 },
  { id: 'c4', type: CardType.CHALLENGE, content: "Ai đã từng đi vệ sinh mà quên bấm nút xả nước? Uống!", intensity: 2 },
  { id: 'c5', type: CardType.CHALLENGE, content: "Chỉ định một 'Vua Nhậu', người đó sẽ được quyền miễn uống trong 3 lượt.", intensity: 1 },
  { id: 'c6', type: CardType.CHALLENGE, content: "Ai đang đi tất (vớ) thì uống 1 ly.", intensity: 1 },
  { id: 'c7', type: CardType.CHALLENGE, content: "Ai đã từng yêu đơn phương người ngồi trong bàn này? Cạn ly.", intensity: 3 },
  { id: 'c8', type: CardType.CHALLENGE, content: "Đếm từ 1-30, số nào có số 3 hoặc chia hết cho 3 thì bỏ qua. Sai uống!", intensity: 2 },
  { id: 'c9', type: CardType.CHALLENGE, content: "Ai có hình xăm trên người thì uống 1 ly.", intensity: 1 },
  { id: 'c10', type: CardType.CHALLENGE, content: "Ai đeo kính cận thì mời người bên cạnh uống cùng nửa ly.", intensity: 1 },
  { id: 'c11', type: CardType.CHALLENGE, content: "Thách đấu nhìn chằm chằm vào mắt người đối diện, ai chớp mắt trước uống.", intensity: 2 },
  { id: 'c12', type: CardType.CHALLENGE, content: "Tất cả những ai chưa tắm ngày hôm nay cạn ly!", intensity: 3 },
  { id: 'c13', type: CardType.CHALLENGE, content: "Người nào đang có người yêu (hoặc vợ/chồng) uống nửa ly để chúc mừng.", intensity: 1 },
  { id: 'c14', type: CardType.CHALLENGE, content: "Người nào đang độc thân uống 1 ly để giải sầu.", intensity: 1 },
  { id: 'c15', type: CardType.CHALLENGE, content: "Chọn 1 người, nếu họ không kể được tên 3 người yêu cũ của bạn, họ uống.", intensity: 3 },
  { id: 'c16', type: CardType.CHALLENGE, content: "Ai mang theo bật lửa/quẹt trong người thì uống.", intensity: 1 },
  { id: 'c17', type: CardType.CHALLENGE, content: "Tất cả mọi người cạn ly vì hôm nay chúng ta còn gặp nhau!", intensity: 2 },
  { id: 'c18', type: CardType.CHALLENGE, content: "Ai dùng mạng Viettel thì uống 1 ly.", intensity: 1 },
  { id: 'c19', type: CardType.CHALLENGE, content: "Chỉ định một 'Nạn Nhân', người đó phải uống bất cứ khi nào bạn uống trong 2 lượt.", intensity: 3 },
  { id: 'c20', type: CardType.CHALLENGE, content: "Ai là người say đầu tiên trong cuộc nhậu trước? Cạn ly.", intensity: 2 }
];

export const INITIAL_DICE_RULES: DiceRule[] = [
  { value: 1, label: 'TỰ XỬ', desc: 'Uống 1 ly ngay lập tức!' },
  { value: 2, label: 'CHỈ ĐỊNH', desc: 'Chọn 1 người uống cùng bạn.' },
  { value: 3, label: 'QUA LƯỢT', desc: 'May mắn! Bạn không cần uống.' },
  { value: 4, label: 'CẢ LÀNG', desc: 'Tất cả mọi người cùng cạn ly!' },
  { value: 5, label: 'TAY TRÁI', desc: 'Tất cả uống bằng tay không thuận.' },
  { value: 6, label: 'VUA LÌ ĐÒN', desc: 'Thách đấu 1 người oẳn tù tì, thua uống 2 ly.' },
];

export const DICE_ICONS: Record<number, React.ReactNode> = {
  1: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7z"/><path d="M12 7v10M9 12h6"/></svg>,
  2: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10 14 2-2 2 2"/><path d="M12 12V3"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg>,
  3: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  4: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18h12M12 22v-4M8 2l1 7h6l1-7H8zM7 9v5a5 5 0 0 0 10 0V9"/></svg>,
  5: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  6: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 14s1 1 1 1 1-2 2-2 1 1 1 1 1-2 2-2 1 1 1 1 1-2 2-2 1 1 1 1"/><path d="M12 2v20"/><path d="m2 12 10 10 10-10L12 2z"/></svg>,
};

export const TYPE_COLORS = {
  [CardType.TRUTH]: 'border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.3)]',
  [CardType.DARE]: 'border-[#ff00ff] shadow-[0_0_20px_rgba(255,0,255,0.3)]',
  [CardType.CHALLENGE]: 'border-[#adff2f] shadow-[0_0_20px_rgba(173,255,47,0.3)]'
};

export const TYPE_TEXT_COLORS = {
  [CardType.TRUTH]: 'text-[#00ffff]',
  [CardType.DARE]: 'text-[#ff00ff]',
  [CardType.CHALLENGE]: 'text-[#adff2f]'
};

export const TYPE_LABELS = {
  [CardType.TRUTH]: 'TRUTH',
  [CardType.DARE]: 'DARE',
  [CardType.CHALLENGE]: 'DRINK'
};
